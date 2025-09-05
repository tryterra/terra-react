import {
  ConfigPlugin,
  withAppDelegate,
  createRunOncePlugin,
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

const pkg = require('terra-react/package.json');
export default createRunOncePlugin(
  withTerraBackgroundDelivery,
  pkg.name,
  pkg.version
);
