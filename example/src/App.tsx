import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  getActivity,
  getBody,
  getDaily,
  getUserId,
  initConnection,
  // deauthTerra,
  initTerra,
  Permissions,
  readGlucoseData,
} from 'terra-react';

export default function App() {
  // can also use a .env file
  const devID = 'DEV ID';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(devID, 'refid', 1, 1, 1, 1, 1).then((d) => {
      console.log(d); // returns details such as success and user id
    });
    initConnection(
      Connections.APPLE_HEALTH,
      'TOKEN',
      true,
      [Permissions.ACTIVITY, Permissions.SLEEP, Permissions.DAILY],
      [],
      'com.example.terrareact.MainActivity'
    ).then((d) => {
      console.log(d);
      let startDate = new Date();
      startDate.setDate(20);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      getDaily(Connections.APPLE_HEALTH, startDate, new Date())
        .then((d) => console.log('daily', d))
        .catch((e) => console.log(e));
      getUserId(Connections.APPLE_HEALTH)
        .then((de) => {
          console.log(de);
        })
        .catch((ee) => console.log(ee));
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
