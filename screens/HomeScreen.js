import React, { useState } from "react";
import { View, Text } from "react-native";

import CurrWeather from "../components/CurrWeather";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
    
    const [weatherData, setWeatherData] = useState({
        name: "Tampere",
        temp: 3,
        windSpeed: 2,
        rain: 0.5,
        humidity: 3,
        sunRise: "7:12",
        sunSet: "16:12",
        maxTemp: 4,
        minTemp: -4,
    });

    const fromSearchToHome = (searchData) => {
        setWeatherData(searchData);
    }

    return (
        <>
            <CurrWeather weatherData={weatherData}/>
            <SearchBar fromSearchToHome={fromSearchToHome}/>
        </>
    );
};