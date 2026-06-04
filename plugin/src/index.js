import {
  AndroidConfig,
  withAndroidManifest,
  withAppDelegate,
  createRunOncePlugin,
} from '@expo/config-plugins';
const withTerraBackgroundDelivery = (config) => {
  config = withAppDelegate(config, (delegateConfig) => {
    const { contents } = delegateConfig.modResults;
    if (delegateConfig.modResults.language === 'swift') {
      if (!delegateConfig.modResults.contents.includes('import TerraiOS')) {
        delegateConfig.modResults.contents =
          `import TerraiOS\n` + delegateConfig.modResults.contents;
      }
      if (
        !delegateConfig.modResults.contents.includes(
          'Terra.setUpBackgroundDelivery()'
        )
      ) {
        const regex =
          /return super.application\(application, didFinishLaunchingWithOptions: launchOptions\)/;
        delegateConfig.modResults.contents =
          delegateConfig.modResults.contents.replace(
            regex,
            (match) => `Terra.setUpBackgroundDelivery()\n  ${match}`
          );
      }
    } else {
      if (!contents.includes('#import <TerraiOS/TerraiOS-Swift.h>')) {
        delegateConfig.modResults.contents = contents.replace(
          '#import "AppDelegate.h"',
          '#import "AppDelegate.h"\n#import <TerraiOS/TerraiOS-Swift.h>'
        );
      }
      if (!contents.includes('[Terra setUpBackgroundDelivery];')) {
        const regex =
          /- \(BOOL\)application:\(UIApplication \*\)application didFinishLaunchingWithOptions:\(NSDictionary \*\)launchOptions\s*\{\n/;
        delegateConfig.modResults.contents =
          delegateConfig.modResults.contents.replace(
            regex,
            (match) => `${match}  [Terra setUpBackgroundDelivery];\n`
          );
      }
    }
    return delegateConfig;
  });
  return config;
};

const SHOW_RATIONALE_ACTION =
  'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE';
const VIEW_PERMISSION_USAGE_ACTION =
  'android.intent.action.VIEW_PERMISSION_USAGE';
const HEALTH_PERMISSIONS_CATEGORY = 'android.intent.category.HEALTH_PERMISSIONS';
const START_VIEW_PERMISSION_USAGE =
  'android.permission.START_VIEW_PERMISSION_USAGE';
const RATIONALE_ALIAS_NAME = 'ViewPermissionUsageActivity';

const declaresAction = (component, action) =>
  (component['intent-filter'] ?? []).some((filter) =>
    (filter.action ?? []).some((entry) => entry.$['android:name'] === action)
  );

// Health Connect needs the app to expose a permissions-rationale component, or
// apps targeting Android 14+ (strictly enforced at API 36) have their health
// read permission silently revoked: reads come back empty while auth still
// succeeds. Managed Expo builds never declare it, so add it here. Each insert is
// skipped when an equivalent component already exists, so this is idempotent
// across repeated prebuilds and coexists with apps that declare it themselves.
export function addHealthConnectPermissionsRationale(androidManifest) {
  const application = androidManifest.manifest.application?.[0];
  if (!application) {
    throw new Error(
      'terra-react: AndroidManifest is missing the <application> element'
    );
  }

  const existing = [
    ...(application.activity ?? []),
    ...(application['activity-alias'] ?? []),
  ];
  const mainActivity =
    AndroidConfig.Manifest.getMainActivityOrThrow(androidManifest);

  if (
    !existing.some((component) => declaresAction(component, SHOW_RATIONALE_ACTION))
  ) {
    mainActivity['intent-filter'] = mainActivity['intent-filter'] ?? [];
    mainActivity['intent-filter'].push({
      action: [{ $: { 'android:name': SHOW_RATIONALE_ACTION } }],
    });
  }

  if (
    !existing.some((component) =>
      declaresAction(component, VIEW_PERMISSION_USAGE_ACTION)
    )
  ) {
    application['activity-alias'] = application['activity-alias'] ?? [];
    application['activity-alias'].push({
      $: {
        'android:name': RATIONALE_ALIAS_NAME,
        'android:exported': 'true',
        'android:targetActivity': mainActivity.$['android:name'],
        'android:permission': START_VIEW_PERMISSION_USAGE,
      },
      'intent-filter': [
        {
          action: [{ $: { 'android:name': VIEW_PERMISSION_USAGE_ACTION } }],
          category: [{ $: { 'android:name': HEALTH_PERMISSIONS_CATEGORY } }],
        },
      ],
    });
  }

  return androidManifest;
}

const withTerraHealthConnectRationale = (config) =>
  withAndroidManifest(config, (manifestConfig) => {
    manifestConfig.modResults = addHealthConnectPermissionsRationale(
      manifestConfig.modResults
    );
    return manifestConfig;
  });

const withTerra = (config) => {
  config = withTerraBackgroundDelivery(config);
  config = withTerraHealthConnectRationale(config);
  return config;
};

const pkg = require('terra-react/package.json');
export default createRunOncePlugin(withTerra, pkg.name, pkg.version);
