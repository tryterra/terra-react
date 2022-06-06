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

function PlatformErrorPromise(): Promise<any> {
  return new Promise<any>((_, rej) => {
    rej('Unsuppported platform');
  });
}

export enum Permissions {
  'ATHLETE',
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

function PermissionsToString(permission: Permissions) {
  switch (permission) {
    case Permissions.ACTIVITY:
      return 'ACTIVITY';
    case Permissions.ATHLETE:
      return 'ATHLETE';
    case Permissions.BODY:
      return 'BODY';
    case Permissions.DAILY:
      return 'DAILY';
    case Permissions.NUTRITION:
      return 'NUTRITION';
    case Permissions.SLEEP:
      return 'SLEEP';
    default:
      return undefined;
  }
}

export function initTerra(
  devID: string,
  apiKey: string,
  referenceId: string,
  intervalMinutes: number,
  connections: Connections[],
  permissions: Permissions[]
): Promise<any> {
  return TerraReact.initTerra(
    devID,
    apiKey,
    referenceId,
    intervalMinutes,
    connections.map((c) => ConnectionToString(c)),
    permissions.map((p) => PermissionsToString(p))
  );
}

export function deauthTerra(connection: Connections) {
  return TerraReact.deauth(ConnectionToString(connection));
}

export function checkAuth(connection: Connections) {
  return TerraReact.checkAuth(ConnectionToString(connection));
}

export function getBody(
  connection: Connections,
  startDate: Date,
  endDate: Date
): Promise<any> {
  switch (Platform.OS) {
    case 'ios':
      return TerraReact.getBody(
        ConnectionToString(connection),
        startDate.toISOString(),
        endDate.toISOString()
      );
    case 'android':
      return TerraReact.getBody(
        ConnectionToString(connection),
        startDate,
        endDate
      );
    default:
      return PlatformErrorPromise();
  }
}
export function getActivity(
  connection: Connections,
  startDate: Date,
  endDate: Date
): Promise<any> {
  switch (Platform.OS) {
    case 'ios':
      return TerraReact.getActivity(
        ConnectionToString(connection),
        startDate.toISOString(),
        endDate.toISOString()
      );
    case 'android':
      return TerraReact.getActivity(
        ConnectionToString(connection),
        startDate,
        endDate
      );
    default:
      return PlatformErrorPromise();
  }
}
export function getDaily(
  connection: Connections,
  startDate: Date,
  endDate: Date
): Promise<any> {
  switch (Platform.OS) {
    case 'ios':
      return TerraReact.getDaily(
        ConnectionToString(connection),
        startDate.toISOString(),
        endDate.toISOString()
      );
    case 'android':
      return TerraReact.getDaily(
        ConnectionToString(connection),
        startDate,
        endDate
      );
    default:
      return PlatformErrorPromise();
  }
}
export function getNutrition(
  connection: Connections,
  startDate: Date,
  endDate: Date
): Promise<any> {
  switch (Platform.OS) {
    case 'ios':
      return TerraReact.getNutrition(
        ConnectionToString(connection),
        startDate.toISOString(),
        endDate.toISOString()
      );
    case 'android':
      return TerraReact.getNutrition(
        ConnectionToString(connection),
        startDate,
        endDate
      );
    default:
      return PlatformErrorPromise();
  }
}
export function getSleep(
  connection: Connections,
  startDate: Date,
  endDate: Date
): Promise<any> {
  switch (Platform.OS) {
    case 'ios':
      return TerraReact.getSleep(
        ConnectionToString(connection),
        startDate.toISOString(),
        endDate.toISOString()
      );
    case 'android':
      return TerraReact.getSleep(
        ConnectionToString(connection),
        startDate,
        endDate
      );
    default:
      return PlatformErrorPromise();
  }
}
export function getAthlete(connection: Connections) {
  return TerraReact.getAthlete(ConnectionToString(connection));
}

export function readGlucoseData() {
  return TerraReact.readGlucoseData();
}
