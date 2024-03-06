import React, { useState } from "react";

import CurrWeather from "../components/CurrWeather";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
    
    const [weatherData, setWeatherData] = useState(null);

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