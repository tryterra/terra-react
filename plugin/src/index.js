import { withPlugins, withAppDelegate, withInfoPlist, withAndroidManifest, createRunOncePlugin } from '@expo/config-plugins';

/**
 * A config plugin for configuring `terra-react`
 */
const withTerraReact = config => {
  config = withAppDelegate(config, (config) => {
    const { contents } = config.modResults;

    if (!contents.includes('#import <TerraiOS/TerraiOS-Swift.h>')) {
      config.modResults.contents = contents.replace(
        '#import "AppDelegate.h"',
        '#import "AppDelegate.h"\n#import <TerraiOS/TerraiOS-Swift.h>'
      );
    }

    if (!contents.includes('[Terra setUpBackgroundDelivery];')) {
      const regex = /- \(BOOL\)application:\(UIApplication \*\)application didFinishLaunchingWithOptions:\(NSDictionary \*\)launchOptions\s*\{\n/;
      config.modResults.contents = config.modResults.contents.replace(
        regex,
        match => `${match}  [Terra setUpBackgroundDelivery];\n`
      );
    }

    return config;
  });

  config = withInfoPlist(config, (config) => {
    config.modResults.NSHealthShareUsageDescription = "custom text shown in the Apple Health permission screen";
    config.modResults.BGTaskSchedulerPermittedIdentifiers = [
      "co.tryterra.data.post.request"
    ];
    config.modResults.UIBackgroundModes = [
      ...(config.modResults.UIBackgroundModes || []),
      "processing",
      "fetch"
    ];
    return config;
  });

  config = withAndroidManifest(config, (config) => {
    const mainActivity = config.modResults.manifest.application[0]['activity'].find(
      (a) => a['$']['android:name'] === '.MainActivity'
    );

    if (!mainActivity['intent-filter']) {
      mainActivity['intent-filter'] = [];
    }

    const existingActions = mainActivity['intent-filter'].flatMap(f => f.action?.map(a => a['$']['android:name']) || []);

    const intentFiltersToAdd = [
      {
        action: 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE'
      },
      {
        action: 'android.intent.action.VIEW_PERMISSION_USAGE',
        category: ['android.intent.category.HEALTH_PERMISSIONS']
      }
    ];

    intentFiltersToAdd.forEach(filter => {
      if (!existingActions.includes(filter.action)) {
        const intentFilter = {
          'action': [{ '$': { 'android:name': filter.action } }],
          ...(filter.category ? { 'category': filter.category.map(name => ({ '$': { 'android:name': name } })) } : {})
        };
        mainActivity['intent-filter'].push(intentFilter);
      }
    });

    return withPlugins(config);
  });
};

const pak = require('terra-react/package.json');
export default createRunOncePlugin(withTerraReact, pak.name, pak.version);