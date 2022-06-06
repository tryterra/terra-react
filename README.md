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
    permissions: Permissions[]
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
