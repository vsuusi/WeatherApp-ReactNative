import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerFont}>M-weather</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#262323',
      justifyContent: 'center',
      paddingTop: 55,
      paddingLeft: 30,
      paddingBottom: 20
    },
    headerFont: {
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#fff',
    }
  });