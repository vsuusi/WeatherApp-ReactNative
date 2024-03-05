import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavBar from './components/BottomNavBar';
import Header from './components/Header';

/* 
  - web palvelu/REST api
  - kaksi näkymää
  - laiterajapinta esim paikkatieto, kartat, sensorit
  - varaudu käyttöliittymässä virhetilanteisiin
  - listanäkymä
*/

export default function App() {
  return (
      <NavigationContainer>
        <Header/>
        <BottomNavBar/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
