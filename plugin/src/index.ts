import {
  ConfigPlugin,
  withAppDelegate,
  withInfoPlist,
  withAndroidManifest,
  createRunOncePlugin,
  AndroidConfig,
} from '@expo/config-plugins';

const withTerraBackgroundDelivery: ConfigPlugin = (config) => {
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
      return delegateConfig;
    }

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

    return delegateConfig;
  });

  config = withInfoPlist(config, (infoPlistConfig) => {
    infoPlistConfig.modResults.NSHealthShareUsageDescription =
      'custom text shown in the Apple Health permission screen';
    infoPlistConfig.modResults.NSHealthClinicalHealthRecordsShareUsageDescription =
      'custom text shown in the Apple Health permission screen';
    infoPlistConfig.modResults.NSHealthUpdateUsageDescription =
      'custom text shown in the Apple Health permission screen';
    infoPlistConfig.modResults.BGTaskSchedulerPermittedIdentifiers = [
      'co.tryterra.data.post.request',
    ];
    infoPlistConfig.modResults.UIBackgroundModes = [
      ...(infoPlistConfig.modResults.UIBackgroundModes || []),
      'processing',
      'fetch',
    ];
    return infoPlistConfig;
  });

  config = withAndroidManifest(config, (androidConfig) => {
    const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(
      androidConfig.modResults
    );

    if (!mainActivity['intent-filter']) {
      mainActivity['intent-filter'] = [];
    }

    const existingActions = mainActivity['intent-filter'].flatMap(
      (f) => f.action?.map((a) => a.$['android:name']) || []
    );

    const intentFiltersToAdd = [
      {
        action: 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE',
      },
      {
        action: 'android.intent.action.VIEW_PERMISSION_USAGE',
        category: ['android.intent.category.HEALTH_PERMISSIONS'],
      },
    ];

    intentFiltersToAdd.forEach((filter) => {
      if (!existingActions.includes(filter.action)) {
        const intentFilter: any = {
          action: [{ $: { 'android:name': filter.action } }],
        };

        if (filter.category) {
          intentFilter.category = filter.category.map((cat) => ({
            $: { 'android:name': cat },
          }));
        }

        mainActivity['intent-filter']?.push(intentFilter);
      }
    });

    return androidConfig;
  });

  return config;
};

const pkg = require('terra-react/package.json');
export default createRunOncePlugin(
  withTerraBackgroundDelivery,
  pkg.name,
  pkg.version
);
