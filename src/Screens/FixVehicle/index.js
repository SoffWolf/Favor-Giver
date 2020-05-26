import React, { useState } from "react";
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image
} from "react-native";

import Button from '~/Components/Button';

const FixVehicle = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style = {{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <View style ={{flex: 1}}>
          <Image source={require('~/Assets/Images/FavorGiver.png')} 
            style={{ width: 90, height: 90 }} />
        </View>
        <View style = {{flex:2.5 }}>
          <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Rubik-Bold'}}>Registration Form</Text>
        </View>
      </View>
      <View style = {styles.header}>
          <Text style ={{color: "#333434", fontFamily: 'Karla_Italic', fontSize: 20, textAlign: 'center'}}>
            Fix Vehicle
          </Text>
      </View>
      <View style = {styles.body}>
        <Text> Task Info here will updated ! </Text>
      </View>
      <View style={styles.button}>
        <Button
          label="<= Back"
          onPress = {() => {navigation.navigate('HelperCheckbox')}}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 5,
    margin: 10
  },
  body:{
    flex: 4,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#F9F4EC',
    alignContent: 'center',
  },
  header:{
    height: 30,
    borderRadius: 1,
    marginTop: 40,
    justifyContent: 'center',
    backgroundColor: '#10D7FC',
    marginHorizontal: 80

  },
  button: {
    flex: 1,
    paddingHorizontal: 120,
    marginTop: 20
  }
})

export default FixVehicle