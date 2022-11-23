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

export default function App() {
  // can also use a .env file
  const devID = 'DEV ID';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(devID, 'refid').then((_) => {
      initConnection(Connections.APPLE_HEALTH, 'TOKEN', true).then((a) => {
        console.log(a); // returns details such as success and user id
        let startDate = new Date();
        startDate.setDate(25);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        getActivity(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('activity', d))
          .catch((e: any) => console.log(e));
        getAthlete(Connections.APPLE_HEALTH)
          .then((d: any) => console.log('athlete', d))
          .catch((e: any) => console.log(e));
        getBody(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('body', d))
          .catch((e: any) => console.log(e));
        getDaily(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('daily', d))
          .catch((e: any) => console.log(e));
        getMenstruation(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('menstruation', d))
          .catch((e: any) => console.log(e));
        getNutrition(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('nutrition', d))
          .catch((e: any) => console.log(e));
        getSleep(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('sleep', d))
          .catch((e: any) => console.log(e));
        getUserId(Connections.APPLE_HEALTH)
          .then((de) => {
            console.log(de);
          })
          .catch((ee) => console.log(ee));
      });
    });
  }

  React.useEffect(() => {
    initThings();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello from Terra</Text>
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
