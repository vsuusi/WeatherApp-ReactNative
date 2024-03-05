import React, { useState } from "react";
import { Text, 
  TextInput, 
  View, 
  Platform, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Alert, 
  Pressable
 } from "react-native";
import Icons from '@expo/vector-icons/Ionicons';

export default function SearchBar() {

  const [city, setCity] = React.useState("");
  const btn = "title";

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
              onChangeText={setCity}
              value={city}
              placeholder="City search"
              mode="outlined"
              />
            <Pressable 
              style={styles.button} 
              onPress={() => Alert.alert('Simple Button pressed')}> 
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