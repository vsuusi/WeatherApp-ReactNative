import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import ForecastScreen from '../screens/ForecastScreen';
import HomeScreen from '../screens/HomeScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomNavBar() {
    return(
        <>
            <BottomTab.Navigator title> 
                <BottomTab.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
                <BottomTab.Screen name="Forecast" component={ForecastScreen} options={{ headerShown: false}}/>
            </BottomTab.Navigator>
            <StatusBar style="auto"/>
        </>
    );
};


