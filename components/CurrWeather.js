import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Icons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function CurrWeather ({weatherData}) {

    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState({lat: 0, long: 0});

    //todo: fetch weather by location in useeffect,
    //      render error handling if loc not available
    //      fix variables, so they work even if weatherData is null
    //      Math.round(weatherData.main.temp-273.15)
    //      api key to env 
    //      proper error handling
    //      forecast page, need another fetch for that
    //      fix currweather first!

    useEffect(() => {
        // fetch first data on with gps

        
    }, []) ;

    const cityName = "Tampere";
    const temp = 3;
    const windSpeed = 2;
    const rain = 0.5;
    const humidity = 3;
    const sunRise = "7:12";
    const sunSet = "16:12";
    const maxTemp = 4;
    const minTemp = -4;
    

    return(
        <View style={styles.wrapper}>
            <View style={styles.top_row}>
                <Text style={styles.sää_nyt}>Sää nyt</Text>
                <Text style={styles.city_name}>{weatherData.name}</Text>
            </View>
            <View style={styles.middle_row}>
                <View style={styles.left_and_right}>
                    <Text style={{fontSize: 48, fontWeight: 'bold', paddingLeft: 25}}>{temp}°</Text> 
                </View>
                <Icons name="sunny" size={110} color={"yellow"}/>
                <View style={styles.left_and_right}>
                    <Text style={styles.middle_row_item}>
                        <Feather name="wind" size={20} color="black"/> {windSpeed} m/s
                    </Text>
                    <Text style={styles.middle_row_item}>
                        <Entypo name="drop" size={20} color="black" /> {rain} mm
                    </Text>
                    <Text style={styles.middle_row_item}>
                        <Feather name="cloud-rain" size={19} color="black" /> {humidity} %
                    </Text>
                </View>
            </View>
            <View style={styles.bottom_row}>
                <Feather name="sunrise" size={22} color="black" />
                <Text style={styles.bottom_row_item}>{sunRise}    </Text>
                <Feather name="sunset" size={22} color="black" />
                <Text style={styles.bottom_row_item}>{sunSet}</Text>
                <View style={{marginHorizontal: 15}}/>
                <FontAwesome6 name="temperature-half" size={22} color="red" />
                <Text style={styles.bottom_row_item}>{maxTemp}°    </Text>
                <FontAwesome6 name="temperature-half" size={22} color="blue" />
                <Text style={styles.bottom_row_item}>{minTemp}°</Text>
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
});