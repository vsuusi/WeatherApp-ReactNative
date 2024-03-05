import React from "react";
import { View, Text } from "react-native";

import CurrWeather from "../components/CurrWeather";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
    return (
        <>
            <CurrWeather/>
            <SearchBar/>
        </>
    );
};