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
import Icon from 'react-native-vector-icons/FontAwesome'

function padding1(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}


const ArrivedScreen = ({navigation}) => {
  return (
    <>
    <View style={{
      flex: 0.8,
      flexDirection: 'row',
      justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'
    }}>
        <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('./FavorGiver.png')} />
          <Text style={{flex:2, flexDirection:'row', fontSize:22}}>
              Your stars:{"\n"}
              <Icon name="star" size={24} color="orange" />
              <Icon name="star" size={24} color="orange" />
              <Icon name="star" size={24} color="orange" />
            </Text>  
          <Image source={require('./download.jpeg')} style={{flex:2, width: 80, height: 80, borderRadius: 80/2, margin: 10}}/>  
    </View>


    <View style={{flex:0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <Text style={{fontSize:30, marginTop: 5}}>Your help is here</Text>
    </View>


    <View style={{flex:2.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <Image source={require('./batman.jpeg')} style={{width: 200, height: 200, borderRadius: 400/ 2, padding: 50}}/>
        <Text style={{fontSize:30, marginTop: 5}}>Batman</Text>
    </View>

    <View style={{flex:0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd', height:70}}>
        <Text style={{fontSize: 15, textAlign:'center', justifyContent:'center', borderColor:'rgb(210, 210, 224)', borderWidth:2}}>Contact information of Helper:
            040123456789
        </Text>
    </View>

    <View style={{flex:1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <View style={{flex:1}}>

        </View>
        <View style={{flex:5, backgroundColor:"rgb(255, 194, 153)", width: 320, height: 100}}>
          <Text style={{justifyContent: 'center', textAlign: 'center', fontSize:25, marginTop: 10}}>My request is fulfilled</Text>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop:5}}>
            <TouchableOpacity style={styles.button}  >
              <Text style={styles.buttonText}
              onPress={() => navigation.navigate('FeedbackScreen')}
              >DONE</Text>
            </TouchableOpacity>
          </View>     
        </View>
        <View style={{flex:1}}>

        </View>
    </View>
      
    <View style={{flex:0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
       
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
        width: 150,
        height: 60,
        backgroundColor: 'rgb(255, 102, 0)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:10  
    },
    button2:{
        width: 250,
        height: 60,
        backgroundColor: 'rgb(255, 51, 51)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12 ,
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff'
      }
})

export default ArrivedScreen;
