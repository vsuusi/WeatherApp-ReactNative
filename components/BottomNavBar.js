import React, { createContext, useContext, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ForecastScreen from '../screens/ForecastScreen';
import HomeScreen from '../screens/HomeScreen';

const BottomTab = createBottomTabNavigator();
const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);


export default function BottomNavBar() {

    const [coords, setCoords] = useState(null);

    // Function to update coords
    const updateCoords = (newCoords) => {
        setCoords(newCoords);
    };

    return(
        <WeatherContext.Provider value={{ coords, updateCoords }}>
            <BottomTab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#3ae8df',
                    tabBarInactiveTintColor: '#fff',
                    tabBarStyle: {
                        backgroundColor: '#262323',
                        padding: 10
                    },
                    
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                }}
            >
                <BottomTab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false}}/>
                <BottomTab.Screen 
                    name="Forecast" 
                    component={ForecastScreen} 
                    options={{ headerShown: false}}
                    />
            </BottomTab.Navigator>
        </WeatherContext.Provider>
    );
};


