/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';



var seeker = {
  "person": {
      "firstName": "The",
      "lastName": "Joker",
      "phoneNumber": "04511111",
      "address": {
          "address": "My other home"
      },
  },
  "picture" : {
      "url": require("./download.jpeg"),  
  },
}
var seeker_avatar = seeker.picture.url;



const SeekerStart: () => React$Node = ({navigation}) => {
  return (
    <>
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'
    }}>

      <Image source={require('./FavorGiver.png')} style={styles.logo}/>
    </View>

    <View style={{flex:2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <Text style={{fontSize:35}}>Welcome</Text>
        <Image source={seeker_avatar} style={{width: 200, height: 200, borderRadius: 400/ 2, padding: 50}}/>
        <Text style={{fontSize:30, marginTop: 10}}>{seeker.person.firstName} {seeker.person.lastName}</Text>
    </View>
      
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('RequestScreen')}>
            <Text style={styles.buttonText}>Request Help</Text>
        </TouchableOpacity>
    </View>
    
    </>
  );
};

const styles=StyleSheet.create({
    logo:{
      height: 100,
      width: 200,
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    button:{
        width: 250,
        height: 60,
        backgroundColor: 'rgb(255, 148, 77)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff'
      }
})

export default SeekerStart;
