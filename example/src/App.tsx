import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  // getActivity,
  getDaily,
  getUserId,
  // deauthTerra,
  initTerra,
  activateSensor,
  initConnection,
  CustomPermissions,
  getActivity
} from 'terra-react';

export default function App() {
  // can also use a .env file
  const devID = 'DEV ID';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(devID, 'refid').then((dd) => {
      initConnection(Connections.APPLE_HEALTH, 'TOKEN', true, [
        CustomPermissions.WORKOUT_TYPES,
        CustomPermissions.ACTIVITY_SUMMARY,
        CustomPermissions.LOCATION,
        CustomPermissions.CALORIES,
        CustomPermissions.STEPS,
        CustomPermissions.HEART_RATE,
        CustomPermissions.ACTIVE_DURATIONS,
        CustomPermissions.EXERCISE_DISTANCE,
        CustomPermissions.SWIMMING_SUMMARY,
      ]).then((d) => {
        console.log(d); // returns details such as success and user id
        let startDate = new Date();
        startDate.setDate(20);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        getDaily(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('daily', d))
          .catch((e: any) => console.log(e));
        getActivity(Connections.APPLE_HEALTH, startDate, new Date())
          .then((d: any) => console.log('activity', d))
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
