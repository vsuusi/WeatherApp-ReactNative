import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {  useFonts, Kalam_400Regular } from '@expo-google-fonts/kalam';

export default function Header() {

    let [fontsLoaded] = useFonts({
        Kalam_400Regular,
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerFont}>Myrpen sääsovellus</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#262323',
      justifyContent: 'center',
      paddingTop: 50,
      paddingBottom: 10
    },
    headerFont: {
        fontSize: 30,
        fontFamily: 'Kalam_400Regular',
        color: '#fff',
        textAlign: 'center'
    }
  });