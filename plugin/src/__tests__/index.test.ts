import { addHealthConnectPermissionsRationale } from '../index';

// The plugin module reads its own package.json at load time; stub it so the
// test does not depend on terra-react being resolvable from node_modules.
jest.mock(
  'terra-react/package.json',
  () => ({ name: 'terra-react', version: '0.0.0' }),
  { virtual: true }
);

const SHOW_RATIONALE = 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE';
const VIEW_PERMISSION_USAGE = 'android.intent.action.VIEW_PERMISSION_USAGE';
const HEALTH_PERMISSIONS = 'android.intent.category.HEALTH_PERMISSIONS';

const freshManifest = (): any => ({
  manifest: {
    $: { 'xmlns:android': 'http://schemas.android.com/apk/res/android' },
    application: [
      {
        $: { 'android:name': '.MainApplication' },
        activity: [
          {
            $: { 'android:name': '.MainActivity', 'android:exported': 'true' },
            'intent-filter': [
              {
                action: [
                  { $: { 'android:name': 'android.intent.action.MAIN' } },
                ],
                category: [
                  { $: { 'android:name': 'android.intent.category.LAUNCHER' } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});

const filtersWithAction = (component: any, action: string) =>
  (component['intent-filter'] ?? []).filter((filter: any) =>
    (filter.action ?? []).some((a: any) => a.$['android:name'] === action)
  );

describe('addHealthConnectPermissionsRationale', () => {
  it('adds the legacy rationale filter and the Android 14+ activity-alias', () => {
    const manifest = freshManifest();
    addHealthConnectPermissionsRationale(manifest);

    const application = manifest.manifest.application[0];
    const mainActivity = application.activity[0];

    expect(filtersWithAction(mainActivity, SHOW_RATIONALE)).toHaveLength(1);
    // The launcher intent-filter must survive.
    expect(filtersWithAction(mainActivity, 'android.intent.action.MAIN')).toHaveLength(1);

    expect(application['activity-alias']).toHaveLength(1);
    const alias = application['activity-alias'][0];
    expect(alias.$['android:exported']).toBe('true');
    expect(alias.$['android:targetActivity']).toBe('.MainActivity');
    expect(alias.$['android:permission']).toBe(
      'android.permission.START_VIEW_PERMISSION_USAGE'
    );
    expect(alias['intent-filter'][0].action[0].$['android:name']).toBe(
      VIEW_PERMISSION_USAGE
    );
    expect(alias['intent-filter'][0].category[0].$['android:name']).toBe(
      HEALTH_PERMISSIONS
    );
  });

  it('is idempotent across repeated prebuilds', () => {
    const manifest = freshManifest();
    addHealthConnectPermissionsRationale(manifest);
    addHealthConnectPermissionsRationale(manifest);
    addHealthConnectPermissionsRationale(manifest);

    const application = manifest.manifest.application[0];
    expect(filtersWithAction(application.activity[0], SHOW_RATIONALE)).toHaveLength(1);
    expect(application['activity-alias']).toHaveLength(1);
  });

  it('does not duplicate a rationale the app already declares itself', () => {
    const manifest = freshManifest();
    manifest.manifest.application[0].activity[0]['intent-filter'].push({
      action: [{ $: { 'android:name': SHOW_RATIONALE } }],
    });
    manifest.manifest.application[0]['activity-alias'] = [
      {
        $: { 'android:name': 'ExistingAlias', 'android:targetActivity': '.MainActivity' },
        'intent-filter': [
          {
            action: [{ $: { 'android:name': VIEW_PERMISSION_USAGE } }],
            category: [{ $: { 'android:name': HEALTH_PERMISSIONS } }],
          },
        ],
      },
    ];

    addHealthConnectPermissionsRationale(manifest);

    const application = manifest.manifest.application[0];
    expect(filtersWithAction(application.activity[0], SHOW_RATIONALE)).toHaveLength(1);
    expect(application['activity-alias']).toHaveLength(1);
    expect(application['activity-alias'][0].$['android:name']).toBe('ExistingAlias');
  });

  it('throws when the manifest has no main activity', () => {
    const manifest: any = {
      manifest: {
        application: [{ $: { 'android:name': '.MainApplication' }, activity: [] }],
      },
    };
    expect(() => addHealthConnectPermissionsRationale(manifest)).toThrow();
  });
});
