import React, { useState, useEffect } from "react";
import { useWeatherContext } from "./BottomNavBar";
import { Text, View, StyleSheet, Image } from "react-native";
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function CurrWeather ({weatherData}) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const { updateCoords } = useWeatherContext();

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours.toString();
        minutes = minutes < 10 ? '0' + minutes : minutes.toString();
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        if (weatherData) {
            setData({
                cityName: weatherData.name,
                temp: Math.round(weatherData.main.temp - 273.15),
                windSpeed: weatherData.wind.speed,
                desc: weatherData.weather[0].description,
                humidity: weatherData.main.humidity,
                sunRise: formatTime(weatherData.sys.sunrise),
                sunSet: formatTime(weatherData.sys.sunset),
                maxTemp: Math.round(weatherData.main.temp_max - 273.15),
                minTemp: Math.round(weatherData.main.temp_min - 273.15),
                icon: weatherData.weather[0].icon
            });
            updateCoords([weatherData.coord.lat, weatherData.coord.lon, weatherData.name]);
        }
    }, [weatherData]);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error("Permission to access location was denied");
                    return;
                }
                var loc = await Location.getCurrentPositionAsync({});
                await fetchLocCity(loc.coords.latitude, loc.coords.longitude);
            } catch (error) {
                console.error("Error fetching location:", error);
                console.error("Please allow usage of location from settings");
            }
        };
        getLocation();

        const fetchLocCity = async (lat,long) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`);
                if (!response.ok) {
                  throw new Error('Failed to fetch gps city');
                }
                const wdata = await response.json();
                setData({
                    cityName: wdata.name,
                    temp: Math.round(wdata.main.temp - 273.15),
                    windSpeed: wdata.wind.speed,
                    desc: wdata.weather[0].description,
                    humidity: wdata.main.humidity,
                    sunRise: formatTime(wdata.sys.sunrise),
                    sunSet: formatTime(wdata.sys.sunset),
                    maxTemp: Math.round(wdata.main.temp_max - 273.15),
                    minTemp: Math.round(wdata.main.temp_min - 273.15),
                    icon: wdata.weather[0].icon
                });
                setIsLoading(false);
                updateCoords([wdata.coord.lat, wdata.coord.lon, wdata.name]);
              } catch (error) {
                console.error("error fetching city by gps", error);
              }
        };
    }, []);

    if (isLoading) {
        return(
            <View style={styles.wrapper}>
                <Text style={styles.loaderText}>
                    Hang on tight, {"\n"}
                    Fetching weather for your current location...
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