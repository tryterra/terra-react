import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  getActivity,
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
  const devID = 'testingElliott';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(devID, 'refid', 1, 1, 1, 1, 1).then((d) => {
      console.log(d); // returns details such as success and user id
    });
    initConnection(
      Connections.FREESTYLE_LIBRE,
      '822bc69401f17d22b8c61a4e0eb3f035af0104504d41cee6f0dc50b0a40118b3',
      true,
      [Permissions.ACTIVITY, Permissions.SLEEP, Permissions.DAILY]
    ).then((d) => {
      console.log(d);
      let startDate = new Date();
      startDate.setDate(20);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      // getDaily(Connections.APPLE_HEALTH, startDate, new Date())
      //   .then((d) => console.log('daily', d))
      //   .catch((e) => console.log(e));
      getUserId(Connections.FREESTYLE_LIBRE)
        .then((de) => {
          console.log(de);
          readGlucoseData().then((d) => {
            console.log(JSON.parse(d));
            console.log(typeof d);
          });
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
