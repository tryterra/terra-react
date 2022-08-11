import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  // getActivity,
  getDaily,
  getUserId,
  initConnection,
  // deauthTerra,
  initTerra,
  // readGlucoseData,
} from 'terra-react';

export default function App() {
  // can also use a .env file
  const devID = 'testing';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(devID, 'refid').then((d) => {
      console.log(d); // returns details such as success and user id
    });
    initConnection(
      Connections.FREESTYLE_LIBRE,
      '8e25b7f1ced7a9f79bfb2ac09ce3e7a4f2c51d0094aeb2d39b725fd2328af7da',
      true,
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
        .then((d: any) => console.log('daily', d))
        .catch((e: any) => console.log(e));
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
