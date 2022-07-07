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
      Connections.SAMSUNG,
      '8177148efe02b0b261241a996d1c562ead695a87b58d61fb6b2739ee42c2a921',
      true,
      [Permissions.ACTIVITY, Permissions.SLEEP, Permissions.DAILY]
    ).then((d) => {
      console.log(d);
      let startDate = new Date();
      startDate.setDate(20);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      // getDaily(Connections.GOOGLE, startDate, new Date())
      //   .then((d) => console.log(d))
      //   .catch((e) => console.log(e));
    });
  }

  React.useEffect(() => {
    initThings();
    setTimeout(function () {
      getUserId(Connections.SAMSUNG)
        .then((de) => console.log(de))
        .catch((ee) => console.log(ee));
    }, 1000);
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
