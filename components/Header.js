import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Header() {

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
      paddingTop: 55,
      paddingLeft: 30,
      paddingBottom: 20
    },
    headerFont: {
        fontSize: 30,
        fontFamily: 'LobsterRegular',
        color: '#fff',
    }
  });