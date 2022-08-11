# terra-react

React Native SDK mapping

## Installation

```sh
npm install terra-react
```

## Usage latest update (1.0.18): 

Regardless of Android or iOS, here are the functions available that you can import from `terra-react` (platform check is delt with under the hood):

```js
// initialise terra with timer intervals
export function initTerra(
    devID: string,
    referenceId: string,
): Promise<any>;

// initialise connections
export function initConnection(
  connection: Connections,
  token: string, //Auth token by our backend: https://docs.tryterra.co/reference/generate-authentication-token
  schedulerOn: boolean,
  permissions: Permissions[],
  customPermissions: CustomPermissions[] = [] //defaults to empty, however if provided, it will overwrite permissions
): Promise<any>;

//Getting the user ID for a given connection.
export function getUserId(connection: Connections): Promise<any>

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
