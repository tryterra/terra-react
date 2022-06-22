# terra-react

React Native SDK mapping

## Installation

```sh
npm install terra-react
```

## Usage

Regardless of Android or iOS, here are the functions available that you can import from `terra-react` (platform check is delt with under the hood):

```js
// initialise terra with a set of connections and permissions
export function initTerra(
    devID: string,
    apiKey: string,
    referenceId: string,
    intervalMinutes: number,
    connections: Connections[],
    permissions: Permissions[],
    customPermissions: CustomPermissions[] // This is optional. It allows you to fine tune permission requests from Apple Health
): Promise<any>;

// deauth a particular terra connection
export function deauthTerra(connection: Connections): void;

// check a particular terra connection auth
export function checkAuth(connection: Connections): Promise<any>;

// get body data for a connection
export function getBody(
    connection: Connections,
    startDate: Date,
    endDate: Date
): Promise<any>;

// get activity data for a connection
export function getActivity(
    connection: Connections,
    startDate: Date,
    endDate: Date
): Promise<any>;

// get athlete data for a connection
export function getAthlete(connection: Connections): Promise<any>;

// get daily data for a connection
export function getDaily(
    connection: Connections,
    startDate: Date,
    endDate: Date
): Promise<any>;

// get sleep data for a connection
export function getSleep(
    connection: Connections,
    startDate: Date,
    endDate: Date
): Promise<any>;

// get nutrition data for a connection
export function getNutrition(
    connection: Connections,
    startDate: Date,
    endDate: Date
): Promise<any>;

// init freestyle (just for Apple)
export function readGlucoseData(): Promise<any>;
```

## Enums

There is two available enums: providers (connections) and permissions. These can be used in the functions above where applicable.

```js
export enum Permissions {
    "ATHLETE",
    "ACTIVITY",
    "BODY",
    "DAILY",
    "NUTRITION",
    "SLEEP",
}

export enum Connections {
    "APPLE_HEALTH",
    "FREESTYLE_LIBRE",
    "GOOGLE",
    "SAMSUNG",
}

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
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
