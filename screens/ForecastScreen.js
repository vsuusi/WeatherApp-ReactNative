import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../components/BottomNavBar";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Feather, FontAwesome6 } from '@expo/vector-icons';

export default function ForecastScreen() {

    const { coords } = useWeatherContext();
    const [forecastData, setForecastData] = useState(null); // cannot conver to obj

    useEffect(() =>{
        const fetchForecast = async (lat,lon) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8f570fd5f0dbc9bba4e6f9fd7b625dd5`)
                if (!response.ok) {
                    throw new Error('Failed to fetch forecast');
                }
                const data = await response.json();
                setForecastData(data.list);
            } catch (error) {
                console.error(error);
            }
        }
        fetchForecast(coords[0],coords[1])
    }, [coords]);
    

    const formatDate = (dateString) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const weekdayIndex = date.getDay();
        const weekday = daysOfWeek[weekdayIndex];
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedDate = `${weekday} ${hours}:${formattedMinutes}`;
        return formattedDate;
    };
    
    const ForecastRender = ({ item }) => (
        <View style={styles.listItem}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.iconView}>
                    <Image
                        source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
                        style={{ width: 60, height: 60 }}
                    />
                </View>
                <View>
                    <Text style={styles.day}>{formatDate(item.dt_txt)}</Text>
                    <View style={styles.weatherItems}>
                        <Text style={{fontSize: 20}}>
                            <FontAwesome6 name="temperature-half" size={22} color="red" />
                            {Math.round(item.main.temp_max - 273.15)}°
                        </Text>
                        <Text style={{fontSize: 20}}>
                            <FontAwesome6 name="temperature-half" size={22} color="blue" />
                            {Math.round(item.main.temp_min - 273.15)}°
                        </Text>
                        <Text style={{fontSize: 20}}>
                            <Feather name="wind" size={20} color="black"/>
                            {item.wind.speed}m/s
                        </Text>
                    </View>
                </View>
                <View style={styles.iconView}/>
            </View>
        </View>
    )

    if (!forecastData) {
        return <Text style={{fontSize: 32,
                             textAlign: 'center',
                             justifyContent: 'center'}}>
                                Loading...</Text>;
    }
    

    return (
        <>
        <Text style={styles.city}>{coords[2]}</Text>
            <FlatList
                data={forecastData}
                renderItem={ForecastRender}
                keyExtractor={(item) => item.dt.toString()}
            />
        </>
    );

    
};

const styles = StyleSheet.create({
    listItem:
    {   
        flexDirection: 'row',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#3ae8df",
        alignItems: 'center',
        justifyContent: 'center'
    },
    city:
    {
        fontSize: 36,
        textAlign: 'center',
        padding: 20,
    },
    day: 
    {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    weatherItems:
    {
        flexDirection: 'row',
        gap: 25,
        marginLeft: 10

    },
    iconView: 
    {
        width: '15%',
        justifyContent: 'center'
    }
})