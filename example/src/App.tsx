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
  getAthlete,
  getBody,
  getNutrition,
  getSleep,
} from 'terra-react';
import { config } from './config';

export default function App() {
  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array

  const [results, setResults] = React.useState({});

  function initThings(devId: string, token: string) {
    initTerra(devId, 'reid').then((aa) => {
      setResults((r) => ({ ...r, initTerra: aa.success }));
      initConnection(Connections.APPLE_HEALTH, token, true).then((a) => {
        setResults((r) => ({ ...r, initConnection: a.success }));
        let startDate = new Date();
        startDate.setDate(25);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        getActivity(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) =>
            setResults((r) => ({ ...r, getActivity: d.success }))
          )
          .catch((e: any) => console.log(e));
        getAthlete(Connections.APPLE_HEALTH)
          .then((d: any) =>
            setResults((r) => ({ ...r, getAthlete: d.success }))
          )
          .catch((e: any) => console.log(e));
        getBody(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => setResults((r) => ({ ...r, getBody: d.success })))
          .catch((e: any) => console.log(e));
        getDaily(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => setResults((r) => ({ ...r, getDaily: d.success })))
          .catch((e: any) => console.log(e));
        getMenstruation(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) =>
            setResults((r) => ({ ...r, getMenstruation: d.success }))
          )
          .catch((e: any) => console.log(e));
        getNutrition(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) =>
            setResults((r) => ({ ...r, getNutrition: d.success }))
          )
          .catch((e: any) => console.log(e));
        getSleep(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => setResults((r) => ({ ...r, getSleep: d.success })))
          .catch((e: any) => console.log(e));
        getUserId(Connections.APPLE_HEALTH)
          .then((de) => {
            setResults((r) => ({ ...r, getUserId: de }));
          })
          .catch((ee) => console.log(ee));
      });
    });
  }

  React.useEffect(() => {
    const devId = config.devId;
    const apiKey = config.apiKey;

    fetch('https://api.tryterra.co/v2/auth/generateAuthToken', {
      method: 'POST',
      headers: {
        'dev-id': devId,
        'x-api-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => initThings(devId, result.token))
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello from Terra</Text>
      {Object.entries(results).map(([k, v], i) => (
        <Text key={i}>
          {k}: {v !== undefined ? v!.toString() : 'undefined'}
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
