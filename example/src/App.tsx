import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  getDaily,
  getUserId,
  getActivity,
  initTerra,
  initConnection,
  getMenstruation,
  readGlucoseData,
  getAthlete,
  getBody,
  getNutrition,
  getSleep,
  activateSensor,
  isHealthConnectAvailable,
  openHealthConnect,
  grantedPermissions,
  checkAuth,
} from 'terra-react';
import { config } from './config';

export default function App() {
  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array

  const [results, setResults] = React.useState({});

  function initThings(devId: string, token: string, connection: Connections) {
    initTerra(devId, 'reid').then((aa) => {
      setResults((r) => ({ ...r, initTerra: aa.success }));
      initConnection(connection, token, true).then((a) => {
        setResults((r) => ({ ...r, initConnection: a.success }));
        let startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        getActivity(connection, startDate, new Date())
          .then((d: any) => console.log(d))
          .catch((e: any) => console.log(e));
        getBody(connection, startDate, new Date(), true, false)
          .then((d: any) => {
            setResults((r) => ({ ...r, getBody: d.success }));
          })
          .catch((e: any) => console.log(e));
        getDaily(connection, startDate, new Date())
          .then((d: any) => setResults((r) => ({ ...r, getDaily: d.success })))
          .catch((e: any) => console.log(e));
        getMenstruation(connection, startDate, new Date())
          .then((d: any) =>
            setResults((r) => ({ ...r, getMenstruation: d.success }))
          )
          .catch((e: any) => console.log(e));
        getNutrition(connection, startDate, new Date())
          .then((d: any) =>
            setResults((r) => ({ ...r, getNutrition: d.success }))
          )
          .catch((e: any) => console.log(e));
        getSleep(connection, startDate, new Date())
          .then((d: any) => setResults((r) => ({ ...r, getSleep: d.success })))
          .catch((e: any) => console.log(e));
        // readGlucoseData().then((d) => {console.log(d.data.blood_glucose_samples);});
        getUserId(connection)
          .then((de) => {
            console.log(de.userId);
            setResults((r) => ({ ...r, getUserId: de.userId }));
          })
          .catch((ee) => console.log(ee));
        checkAuth(connection, devId).then((d) => {
          console.log(d);
        });
      });
    });
  }

  React.useEffect(() => {
    const devId = config.devId;
    const apiKey = config.apiKey;
    const connection = Connections.APPLE_HEALTH;
    fetch('https://api.tryterra.co/v2/auth/generateAuthToken', {
      method: 'POST',
      headers: {
        'dev-id': devId,
        'x-api-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => initThings(devId, result.token, connection))
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello from Terra</Text>
      {Object.entries(results).map(([k, v], i) => (
        <Text key={i}>
          {k}: {v !== undefined || v !== null ? v!.toString() : 'undefined'}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
