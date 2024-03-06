import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Icons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function CurrWeather ({weatherData}) {

    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState({lat: 0, long: 0});
    const [data, setData] = useState({
        cityName: "alkudata",
        temp: 0,
        windSpeed: 0,
        desc: "",
        humidity: 0,
        sunRise: "0",
        sunSet: "0",
        maxTemp: 0,
        minTemp: 0,
        icon: "",
    });

    const formatTime = (timestamp) => {
        const lastFourDigits = String(timestamp).substring(6); // Extract last four digits
        const hours = lastFourDigits.substring(0, 2); // Extract hours
        const minutes = lastFourDigits.substring(2); // Extract minutes
        return `${hours}:${minutes}`;
    }

    
    //todo: fetch weather by location in useeffect,
    //      render error handling if loc not available
    //      fix variables, so they work even if weatherData is null
    //      Math.round(weatherData.main.temp-273.15)
    //      api key to env 
    //      proper error handling
    //      forecast page, need another fetch for that
    //      fix currweather first!
    //      to run: npx expo

    useEffect(() => {
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error("Permission to access location was denied");
                    return;
                }
                var loc = await Location.getCurrentPositionAsync({});
                setLocation({ lat: loc.coords.latitude, long: loc.coords.longitude });
                await fetchLocCity(loc.coords.latitude, loc.coords.longitude);
            } catch (error) {
                console.error("Error fetching location:", error);
                console.error("Please allow usage of location from settings");
            }
        };
        getLocation();

        const fetchLocCity = async (lat,long) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8f570fd5f0dbc9bba4e6f9fd7b625dd5`);
                if (!response.ok) {
                  throw new Error('Failed to fetch gps city');
                }
                const data = await response.json();
                setData({
                    cityName: data.name,
                    temp: Math.round(data.main.temp - 273.15),
                    windSpeed: data.wind.speed,
                    desc: data.weather[0].description,
                    humidity: data.main.humidity,
                    sunRise: formatTime(data.sys.sunrise),
                    sunSet: formatTime(data.sys.sunset),
                    maxTemp: Math.round(data.main.temp_max - 273.15),
                    minTemp: Math.round(data.main.temp_min - 273.15),
                    icon: data.weather[0].icon
                });
                setIsLoading(false);
              } catch (error) {
                console.error("error fetching gps city", error);
              }
        };

    }, []) ;

    if (isLoading) {
        return(
            <View style={styles.wrapper}>
                <Text style={styles.loaderText}>
                    Hang on tight, {"\n"}
                    Fetching weather for your current location
                </Text>
            </View>
        )
    }
    

    return(
        <View style={styles.wrapper}>
            <View style={styles.top_row}>
                <Text style={styles.sää_nyt}>Sää nyt</Text>
                <Text style={styles.city_name}>{data.cityName}</Text>
            </View>
            <View style={styles.middle_row}>
                <View style={styles.left_and_right}>
                    <Text style={{fontSize: 48, fontWeight: 'bold', paddingLeft: 25}}>{data.temp}°</Text> 
                </View>

                <Image
                    source={{ uri: `http://openweathermap.org/img/wn/${data.icon}.png` }}
                    style={{ width: 110, height: 110 }}
                />

                <View style={styles.left_and_right}>
                    <Text style={styles.middle_row_item}>
                         {data.desc}
                    </Text>
                    <Text style={styles.middle_row_item}>
                        <Feather name="wind" size={20} color="black"/> {data.windSpeed} m/s
                    </Text>
                    <Text style={styles.middle_row_item}>
                        <Feather name="cloud-rain" size={19} color="black" /> {data.humidity} %
                    </Text>
                </View>
            </View>
            <View style={styles.bottom_row}>
                <Feather name="sunrise" size={22} color="black" />
                <Text style={styles.bottom_row_item}>{data.sunRise}    </Text>
                <Feather name="sunset" size={22} color="black" />
                <Text style={styles.bottom_row_item}>{data.sunSet}</Text>
                <View style={{marginHorizontal: 15}}/>
                <FontAwesome6 name="temperature-half" size={22} color="red" />
                <Text style={styles.bottom_row_item}>{data.maxTemp}°    </Text>
                <FontAwesome6 name="temperature-half" size={22} color="blue" />
                <Text style={styles.bottom_row_item}>{data.minTemp}°</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: 
    {
        borderWidth: 1,
        flex: 5,
        backgroundColor: "#3ae8df",
        margin: 10,
        marginTop: 50,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    top_row: 
    {
        alignItems: 'center'
    },
    sää_nyt: 
    {
        fontSize: 24,
        fontWeight: '300'
    },
    city_name: 
    {
        fontSize: 32
    }, 
    left_and_right: 
    {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        gap: 5
    },
    middle_row: 
    {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30
    },
    middle_row_item: 
    {
        fontSize: 20
    },
    bottom_row: 
    {
        flexDirection: 'row',
        gap: 3
    },
    bottom_row_item: 
    {
        fontSize: 22
    },
    loaderText:
    {
        textAlign: 'center'
    }
});