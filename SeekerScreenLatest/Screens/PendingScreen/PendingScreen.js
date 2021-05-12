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


function padding1(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}
import StopWatch from '../../Components/stopwatch'

const PendingScreen: () => React$Node = ({navigation}) => {
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
        <Image source={require('./download.jpeg')} style={{width: 200, height: 200, borderRadius: 400/ 2, padding: 50}}/>
        <Text style={{fontSize:30, marginTop: 10}}>The Joker</Text>
    </View>

    <View style={{flex:1.6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd', height:70}}>
        <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate('OnTheWayScreen')} >
          <Text style={{fontSize: 35, color: 'white', marginBottom:2}}>Pending</Text>
            <StopWatch />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}  >
            <Text style={styles.buttonText}
            onPress={() => navigation.navigate('SeekerStart')}
            >Cancel Request</Text>
        </TouchableOpacity>
    </View>
      
    <View style={{flex:0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
       
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
        height: 90,
        backgroundColor: '#80dfff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12  
    },
    button2:{
        width: 250,
        height: 60,
        backgroundColor: 'rgb(255, 51, 51)',
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

export default PendingScreen;
