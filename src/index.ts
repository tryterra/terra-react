import { NativeModules, Platform } from 'react-native';
import { CustomPermissions as CustomPermissions_ } from './enums/CustomPermissions';
import { Connections as Connections_ } from './enums/Connections';
import { Activity as TerraActivityPayload } from './models/Activity';

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
  success: boolean;
  userId: string | null;
};

export type SuccessMessage = {
  success: boolean;
  error: string | null;
};

export type DataMessage = {
  success: boolean;
  data: Object;
  error: string | null;
};

function ConnectionToString(connection: Connections_) {
  switch (connection) {
    case Connections_.APPLE_HEALTH:
      return 'APPLE_HEALTH';
    case Connections_.FREESTYLE_LIBRE:
      return 'FREESTYLE_LIBRE';
    case Connections_.GOOGLE:
      return 'GOOGLE';
    case Connections_.SAMSUNG:
      return 'SAMSUNG';
    case Connections_.HEALTH_CONNECT:
      return 'HEALTH_CONNECT';
    default:
      return undefined;
  }
}

function CustomPermissions_ToString(cPermission: CustomPermissions_) {
  switch (cPermission) {
    case CustomPermissions_.WORKOUT_TYPES:
      return 'WORKOUT_TYPES';
    case CustomPermissions_.ACTIVITY_SUMMARY:
      return 'ACTIVITY_SUMMARY';
    case CustomPermissions_.LOCATION:
      return 'LOCATION';
    case CustomPermissions_.CALORIES:
      return 'CALORIES';
    case CustomPermissions_.STEPS:
      return 'STEPS';
    case CustomPermissions_.HEART_RATE:
      return 'HEART_RATE';
    case CustomPermissions_.HEART_RATE_VARIABILITY:
      return 'HEART_RATE_VARIABILITY';
    case CustomPermissions_.VO2MAX:
      return 'VO2MAX';
    case CustomPermissions_.HEIGHT:
      return 'HEIGHT';
    case CustomPermissions_.ACTIVE_DURATIONS:
      return 'ACTIVE_DURATIONS';
    case CustomPermissions_.WEIGHT:
      return 'WEIGHT';
    case CustomPermissions_.FLIGHTS_CLIMBED:
      return 'FLIGHTS_CLIMBED';
    case CustomPermissions_.BMI:
      return 'BMI';
    case CustomPermissions_.BODY_FAT:
      return 'BODY_FAT';
    case CustomPermissions_.EXERCISE_DISTANCE:
      return 'EXERCISE_DISTANCE';
    case CustomPermissions_.GENDER:
      return 'GENDER';
    case CustomPermissions_.DATE_OF_BIRTH:
      return 'DATE_OF_BIRTH';
    case CustomPermissions_.BASAL_ENERGY_BURNED:
      return 'BASAL_ENERGY_BURNED';
    case CustomPermissions_.SWIMMING_SUMMARY:
      return 'SWIMMING_SUMMARY';
    case CustomPermissions_.RESTING_HEART_RATE:
      return 'RESTING_HEART_RATE';
    case CustomPermissions_.BLOOD_PRESSURE:
      return 'BLOOD_PRESSURE';
    case CustomPermissions_.BLOOD_GLUCOSE:
      return 'BLOOD_GLUCOSE';
    case CustomPermissions_.BODY_TEMPERATURE:
      return 'BODY_TEMPERATURE';
    case CustomPermissions_.MINDFULNESS:
      return 'MINDFULNESS';
    case CustomPermissions_.LEAN_BODY_MASS:
      return 'LEAN_BODY_MASS';
    case CustomPermissions_.OXYGEN_SATURATION:
      return 'OXYGEN_SATURATION';
    case CustomPermissions_.SLEEP_ANALYSIS:
      return 'SLEEP_ANALYSIS';
    case CustomPermissions_.RESPIRATORY_RATE:
      return 'RESPIRATORY_RATE';
    case CustomPermissions_.NUTRITION_SODIUM:
      return 'NUTRITION_SODIUM';
    case CustomPermissions_.NUTRITION_PROTEIN:
      return 'NUTRITION_PROTEIN';
    case CustomPermissions_.NUTRITION_CARBOHYDRATES:
      return 'NUTRITION_CARBOHYDRATES';
    case CustomPermissions_.NUTRITION_FIBRE:
      return 'NUTRITION_FIBRE';
    case CustomPermissions_.NUTRITION_FAT_TOTAL:
      return 'NUTRITION_FAT_TOTAL';
    case CustomPermissions_.NUTRITION_SUGAR:
      return 'NUTRITION_SUGAR';
    case CustomPermissions_.NUTRITION_VITAMIN_C:
      return 'NUTRITION_VITAMIN_C';
    case CustomPermissions_.NUTRITION_VITAMIN_A:
      return 'NUTRITION_VITAMIN_A';
    case CustomPermissions_.NUTRITION_CALORIES:
      return 'NUTRITION_CALORIES';
    case CustomPermissions_.NUTRITION_WATER:
      return 'NUTRITION_WATER';
    case CustomPermissions_.NUTRITION_CHOLESTEROL:
      return 'NUTRITION_CHOLESTEROL';
    case CustomPermissions_.MENSTRUATION:
      return 'MENSTRUATION';
    case CustomPermissions_.INTERBEAT:
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
  connection: Connections_,
  token: string,
  schedulerOn: boolean,
  customPermissions_: CustomPermissions_[] = [],
  startIntent: string | null = null
): Promise<SuccessMessage> {
  return TerraReact.initConnection(
    ConnectionToString(connection),
    token,
    schedulerOn,
    customPermissions_.map((p) => CustomPermissions_ToString(p)),
    startIntent
  );
}

export function checkAuth(
  connection: Connections_,
  devID: string
): Promise<Pick<SuccessMessage, 'success'>> {
  return TerraReact.checkAuth(ConnectionToString(connection), devID);
}

export function getUserId(connection: Connections_): Promise<GetUserId> {
  return TerraReact.getUserId(ConnectionToString(connection));
}

export function getBody(
  connection: Connections_,
  startDate: Date,
  endDate: Date,
  latestReading: boolean = false,
  toWebhook: boolean = true
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
  connection: Connections_,
  startDate: Date,
  endDate: Date,
  toWebhook: boolean = true
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

export function getMenstruation(
  connection: Connections_,
  startDate: Date,
  endDate: Date,
  toWebhook: boolean = true
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
  connection: Connections_,
  startDate: Date,
  endDate: Date,
  toWebhook: boolean = true
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

export function getNutrition(
  connection: Connections_,
  startDate: Date,
  endDate: Date,
  toWebhook: boolean = true
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

export function getSleep(
  connection: Connections_,
  startDate: Date,
  endDate: Date,
  toWebhook: boolean = true
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

export function getAthlete(
  connection: Connections_,
  toWebhook: boolean = true
) {
  return TerraReact.getAthlete(ConnectionToString(connection), toWebhook);
}

/*
@Only availble on iOS
*/
export function postActivity(
  connection: Connections_,
  payload: TerraActivityPayload
): Promise<SuccessMessage> {
  return new Promise<SuccessMessage>((resolve, reject) => {
    TerraReact.postActivity(ConnectionToString(connection), payload)
      .then((d: any) => {
        resolve({ success: d.success, error: d.error } as SuccessMessage);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
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

export function isHealthConnectAvailable(): Promise<boolean> {
  return TerraReact.isHealthConnectAvailable();
}

export function grantedPermissions(): Promise<Array<string>> {
  return TerraReact.grantedPermissions();
}

export function setIgnoredSources(ignoredSources: Array<String>): void {
  TerraReact.setIgnoredSources(ignoredSources).then();
}

export type Activity = TerraActivityPayload;
export { Connections } from './enums/Connections';
export { CustomPermissions } from './enums/CustomPermissions';
