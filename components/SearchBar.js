import React, { useState } from "react";
import {
  TextInput, 
  View, 
  Platform, 
  StyleSheet, 
  KeyboardAvoidingView,
  Keyboard,
  Pressable
 } from "react-native";
import Icons from '@expo/vector-icons/Ionicons';

// import { API_KEY } from '@env'; FIX
API_KEY = "8f570fd5f0dbc9bba4e6f9fd7b625dd5";


export default function SearchBar({fromSearchToHome}) {

  const [cityInput, setCityInput] = useState("");

  const fetchCity = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch city');
      }
      const data = await response.json();
      fromSearchToHome(data);
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
    }
  };
  

  return(
    <>
    <KeyboardAvoidingView 
        style={styles.keyboarwrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset="80"
        >
        
          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              onChangeText={setCityInput}
              value={cityInput}
              placeholder="City search"
              mode="outlined"
              />
            <Pressable 
              style={styles.button} 
              onPress={() => fetchCity(cityInput)}> 
              <Icons name="search" size={40} color={"black"}/>
            </Pressable>
          </View>
          </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboarwrapper: {
    flex: 2
  },
  wrapper: 
  {
      flex: 1,
      margin: 10,
      marginBottom: 40,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  input: 
  {
    marginRight: 10,
    height: '50%',
    width: '80%',
    fontSize: 25,
    borderBottomWidth: 2,
    borderRadius: 5
  },
  label: 
  {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center'
  },
});