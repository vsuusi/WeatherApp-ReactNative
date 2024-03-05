import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* 
  - web palvelu/REST api
  - kaksi näkymää
  - laiterajapinta esim paikkatieto, kartat, sensorit
  - varaudu käyttöliittymässä virhetilanteisiin
  - listanäkymä
*/

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>Halojatahalloo</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container2}>
        <Text>Halojatahalloo</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
