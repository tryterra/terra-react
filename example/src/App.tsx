import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  getDaily,
  getUserId,
  getActivity,
  initTerra,
  initConnection,
  CustomPermissions,
  getMenstruation,
} from 'terra-react';

export default function App() {
  // can also use a .env file
  const devID = 'DEVID';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(devID, 'REFID').then((dd) => {
      initConnection(Connections.SAMSUNG, 'TOKEN', true).then((d) => {console.log(dd)});
      console.log(dd); // returns details such as success and user id
      let startDate = new Date();
      startDate.setDate(1);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      getDaily(Connections.SAMSUNG, startDate, new Date())
        .then((d: any) => console.log('daily', d))
        .catch((e: any) => console.log(e));
      getActivity(Connections.SAMSUNG, startDate, new Date())
        .then((d: any) => console.log('activity', d))
        .catch((e: any) => console.log(e));
      getMenstruation(Connections.SAMSUNG, startDate, new Date())
        .then((d: any) => console.log('menstruation', d))
        .catch((e: any) => console.log(e));
      getUserId(Connections.SAMSUNG)
        .then((de) => {
          console.log(de);
        })
        .catch((ee) => console.log(ee));
    });
    // });
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
