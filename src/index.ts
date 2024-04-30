import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'terra-react' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const TerraReact = NativeModules.TerraReact
  ? NativeModules.TerraReact
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export type GetUserId = {
  success: Boolean;
  userId: String | null;
};

export type SuccessMessage = {
  success: Boolean;
  error: String | null;
};

export type DataMessage = {
  success: Boolean;
  data: Object;
  error: String | null;
};

export enum CustomPermissions {
  'WORKOUT_TYPES',
  'ACTIVITY_SUMMARY',
  'LOCATION',
  'CALORIES',
  'STEPS',
  'HEART_RATE',
  'HEART_RATE_VARIABILITY',
  'VO2MAX',
  'HEIGHT',
  'ACTIVE_DURATIONS',
  'WEIGHT',
  'FLIGHTS_CLIMBED',
  'BMI',
  'BODY_FAT',
  'EXERCISE_DISTANCE',
  'GENDER',
  'DATE_OF_BIRTH',
  'BASAL_ENERGY_BURNED',
  'SWIMMING_SUMMARY',
  'RESTING_HEART_RATE',
  'BLOOD_PRESSURE',
  'BLOOD_GLUCOSE',
  'BODY_TEMPERATURE',
  'MINDFULNESS',
  'LEAN_BODY_MASS',
  'OXYGEN_SATURATION',
  'SLEEP_ANALYSIS',
  'RESPIRATORY_RATE',
  'NUTRITION_SODIUM',
  'NUTRITION_PROTEIN',
  'NUTRITION_CARBOHYDRATES',
  'NUTRITION_FIBRE',
  'NUTRITION_FAT_TOTAL',
  'NUTRITION_SUGAR',
  'NUTRITION_VITAMIN_C',
  'NUTRITION_VITAMIN_A',
  'NUTRITION_CALORIES',
  'NUTRITION_WATER',
  'NUTRITION_CHOLESTEROL',
  'MENSTRUATION',
  'INTERBEAT',
}

export enum Permissions {
  'ACTIVITY',
  'BODY',
  'DAILY',
  'NUTRITION',
  'SLEEP',
}

export enum Connections {
  'APPLE_HEALTH',
  'FREESTYLE_LIBRE',
  'GOOGLE',
  'SAMSUNG',
}

function ConnectionToString(connection: Connections) {
  switch (connection) {
    case Connections.APPLE_HEALTH:
      return 'APPLE_HEALTH';
    case Connections.FREESTYLE_LIBRE:
      return 'FREESTYLE_LIBRE';
    case Connections.GOOGLE:
      return 'GOOGLE';
    case Connections.SAMSUNG:
      return 'SAMSUNG';
    default:
      return undefined;
  }
}

function CustomPermissionsToString(cPermission: CustomPermissions) {
  switch (cPermission) {
    case CustomPermissions.WORKOUT_TYPES:
      return 'WORKOUT_TYPES';
    case CustomPermissions.ACTIVITY_SUMMARY:
      return 'ACTIVITY_SUMMARY';
    case CustomPermissions.LOCATION:
      return 'LOCATION';
    case CustomPermissions.CALORIES:
      return 'CALORIES';
    case CustomPermissions.STEPS:
      return 'STEPS';
    case CustomPermissions.HEART_RATE:
      return 'HEART_RATE';
    case CustomPermissions.HEART_RATE_VARIABILITY:
      return 'HEART_RATE_VARIABILITY';
    case CustomPermissions.VO2MAX:
      return 'VO2MAX';
    case CustomPermissions.HEIGHT:
      return 'HEIGHT';
    case CustomPermissions.ACTIVE_DURATIONS:
      return 'ACTIVE_DURATIONS';
    case CustomPermissions.WEIGHT:
      return 'WEIGHT';
    case CustomPermissions.FLIGHTS_CLIMBED:
      return 'FLIGHTS_CLIMBED';
    case CustomPermissions.BMI:
      return 'BMI';
    case CustomPermissions.BODY_FAT:
      return 'BODY_FAT';
    case CustomPermissions.EXERCISE_DISTANCE:
      return 'EXERCISE_DISTANCE';
    case CustomPermissions.GENDER:
      return 'GENDER';
    case CustomPermissions.DATE_OF_BIRTH:
      return 'DATE_OF_BIRTH';
    case CustomPermissions.BASAL_ENERGY_BURNED:
      return 'BASAL_ENERGY_BURNED';
    case CustomPermissions.SWIMMING_SUMMARY:
      return 'SWIMMING_SUMMARY';
    case CustomPermissions.RESTING_HEART_RATE:
      return 'RESTING_HEART_RATE';
    case CustomPermissions.BLOOD_PRESSURE:
      return 'BLOOD_PRESSURE';
    case CustomPermissions.BLOOD_GLUCOSE:
      return 'BLOOD_GLUCOSE';
    case CustomPermissions.BODY_TEMPERATURE:
      return 'BODY_TEMPERATURE';
    case CustomPermissions.MINDFULNESS:
      return 'MINDFULNESS';
    case CustomPermissions.LEAN_BODY_MASS:
      return 'LEAN_BODY_MASS';
    case CustomPermissions.OXYGEN_SATURATION:
      return 'OXYGEN_SATURATION';
    case CustomPermissions.SLEEP_ANALYSIS:
      return 'SLEEP_ANALYSIS';
    case CustomPermissions.RESPIRATORY_RATE:
      return 'RESPIRATORY_RATE';
    case CustomPermissions.NUTRITION_SODIUM:
      return 'NUTRITION_SODIUM';
    case CustomPermissions.NUTRITION_PROTEIN:
      return 'NUTRITION_PROTEIN';
    case CustomPermissions.NUTRITION_CARBOHYDRATES:
      return 'NUTRITION_CARBOHYDRATES';
    case CustomPermissions.NUTRITION_FIBRE:
      return 'NUTRITION_FIBRE';
    case CustomPermissions.NUTRITION_FAT_TOTAL:
      return 'NUTRITION_FAT_TOTAL';
    case CustomPermissions.NUTRITION_SUGAR:
      return 'NUTRITION_SUGAR';
    case CustomPermissions.NUTRITION_VITAMIN_C:
      return 'NUTRITION_VITAMIN_C';
    case CustomPermissions.NUTRITION_VITAMIN_A:
      return 'NUTRITION_VITAMIN_A';
    case CustomPermissions.NUTRITION_CALORIES:
      return 'NUTRITION_CALORIES';
    case CustomPermissions.NUTRITION_WATER:
      return 'NUTRITION_WATER';
    case CustomPermissions.NUTRITION_CHOLESTEROL:
      return 'NUTRITION_CHOLESTEROL';
    case CustomPermissions.MENSTRUATION:
      return 'MENSTRUATION';
    case CustomPermissions.INTERBEAT:
      return 'INTERBEAT';
  }
}

export function initTerra(
  devID: string,
  referenceId: string | null
): Promise<SuccessMessage> {
  return TerraReact.initTerra(devID, referenceId);
}

export function initConnection(
  connection: Connections,
  token: string,
  schedulerOn: boolean,
  customPermissions: CustomPermissions[] = [],
  startIntent: String | null = null
): Promise<SuccessMessage> {
  return TerraReact.initConnection(
    ConnectionToString(connection),
    token,
    schedulerOn,
    customPermissions.map((p) => CustomPermissionsToString(p)),
    startIntent
  );
}

export function checkAuth(
  connection: Connections,
  devID: string
): Promise<Pick<SuccessMessage, 'success'>> {
  return TerraReact.checkAuth(ConnectionToString(connection), devID);
}

export function getUserId(connection: Connections): Promise<GetUserId> {
  return TerraReact.getUserId(ConnectionToString(connection));
}

export function getBody(
  connection: Connections,
  startDate: Date,
  endDate: Date,
  latestReading: Boolean = false,
  toWebhook: Boolean = true
): Promise<DataMessage> {
  return new Promise<DataMessage>((resolve, reject) => {
    TerraReact.getBody(
      ConnectionToString(connection),
      startDate.toISOString(),
      endDate.toISOString(),
      latestReading,
      toWebhook
    )
      .then((d: any) => {
        const data: DataMessage = {
          success: d.success,
          data: d.data !== undefined ? JSON.parse(d.data) : null,
          error: d.error,
        };
        resolve(data);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function getActivity(
  connection: Connections,
  startDate: Date,
  endDate: Date,
  toWebhook: Boolean = true
): Promise<DataMessage> {
  return new Promise<DataMessage>((resolve, reject) => {
    TerraReact.getActivity(
      ConnectionToString(connection),
      startDate.toISOString(),
      endDate.toISOString(),
      toWebhook
    )
      .then((d: any) => {
        const data: DataMessage = {
          success: d.success,
          data:
            d.data !== undefined || d.data !== null ? JSON.parse(d.data) : null,
          error: d.error,
        };
        resolve(data);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function getMenstruation(
  connection: Connections,
  startDate: Date,
  endDate: Date,
  toWebhook: Boolean = true
): Promise<DataMessage> {
  return new Promise<DataMessage>((resolve, reject) => {
    TerraReact.getMenstruation(
      ConnectionToString(connection),
      startDate.toISOString(),
      endDate.toISOString(),
      toWebhook
    )
      .then((d: any) => {
        const data: DataMessage = {
          success: d.success,
          data: d.data !== undefined ? JSON.parse(d.data) : null,
          error: d.error,
        };
        resolve(data);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function getDaily(
  connection: Connections,
  startDate: Date,
  endDate: Date,
  toWebhook: Boolean = true
): Promise<DataMessage> {
  return new Promise<DataMessage>((resolve, reject) => {
    TerraReact.getDaily(
      ConnectionToString(connection),
      startDate.toISOString(),
      endDate.toISOString(),
      toWebhook
    )
      .then((d: any) => {
        const data: DataMessage = {
          success: d.success,
          data:
            d.data !== undefined || d.data !== null ? JSON.parse(d.data) : null,
          error: d.error,
        };
        resolve(data);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function getNutrition(
  connection: Connections,
  startDate: Date,
  endDate: Date,
  toWebhook: Boolean = true
): Promise<DataMessage> {
  return new Promise<DataMessage>((resolve, reject) => {
    TerraReact.getNutrition(
      ConnectionToString(connection),
      startDate.toISOString(),
      endDate.toISOString(),
      toWebhook
    )
      .then((d: any) => {
        const data: DataMessage = {
          success: d.success,
          data:
            d.data !== undefined || d.data !== null ? JSON.parse(d.data) : null,
          error: d.error,
        };
        resolve(data);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function getSleep(
  connection: Connections,
  startDate: Date,
  endDate: Date,
  toWebhook: Boolean = true
): Promise<DataMessage> {
  return new Promise<DataMessage>((resolve, reject) => {
    TerraReact.getSleep(
      ConnectionToString(connection),
      startDate.toISOString(),
      endDate.toISOString(),
      toWebhook
    )
      .then((d: any) => {
        const data: DataMessage = {
          success: d.success,
          data: d.data !== undefined ? JSON.parse(d.data) : null,
          error: d.error,
        };
        resolve(data);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function getAthlete(connection: Connections, toWebhook: Boolean = true) {
  return TerraReact.getAthlete(ConnectionToString(connection), toWebhook);
}

export function readGlucoseData(): Promise<Object> {
  return new Promise<Object>((resolve, reject) => {
    TerraReact.readGlucoseData()
      .then((d: any) => {
        resolve(JSON.parse(d));
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function activateSensor(): Promise<Object> {
  return new Promise<Object>((resolve, reject) => {
    TerraReact.activateSensor()
      .then((d: any) => {
        resolve(JSON.parse(d));
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function openHealthConnect(): void {
  TerraReact.openHealthConnect().catch((e: any) => {
    console.log(e);
    return;
  });
}

export function isHealthConnectAvailable(): Promise<Boolean> {
  return TerraReact.isHealthConnectAvailable();
}

export function grantedPermissions(): Promise<Array<String>> {
  return TerraReact.grantedPermissions();
}

export function setIgnoredSources(ignoredSources: Array<String>): void {
  TerraReact.setIgnoredSources(ignoredSources).then();
}
