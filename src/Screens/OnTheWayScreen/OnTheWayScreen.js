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


const OnTheWay = ({navigation}) => {
  return (
    <>
    <View style={{
      flex: 0.6,
      flexDirection: 'row',
      justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'
    }}>
        <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('./FavorGiver.png')} />
          <Text style={{flex:2, flexDirection:'row', fontSize:22, padding:20, paddingTop:25}}>
              Your stars:{"\n"}
              <Icon name="star" size={25} color="orange" />
              <Icon name="star" size={25} color="orange" />
              <Icon name="star" size={25} color="orange" />
            </Text>  
          <Image source={require('./download.jpeg')} style={{flex:2, width: 80, height: 80, borderRadius: 80/2, margin: 10}}/>  
    </View>


    <View style={{flex:1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <Image source={require('./batman.jpeg')} style={{width: 200, height: 200, borderRadius: 400/ 2, padding: 50}}/>
        <Text style={{fontSize:30, marginTop: 5}}>Batman</Text>
    </View>

    <View style={{flex:1.6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd', height:70}}>
        <TouchableOpacity style={styles.button}  
        onPress={() => navigation.navigate('ArrivedScreen')}>
            <Text style={styles.buttonText}>A Helper - Bruce{"\n"}will arrived within 15mins</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 15, textAlign:'center', justifyContent:'center', borderColor:'rgb(210, 210, 224)', borderWidth:2}}>Contact information of Helper:
            040123456789
        </Text>
        <TouchableOpacity style={styles.button2}  >
            <Text style={styles.buttonText}
            onPress={() => navigation.navigate('SeekerStart')}
            >Cancel Request</Text>
        </TouchableOpacity>
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
        width: 250,
        height: 100,
        backgroundColor: '#80dfff',
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

export default OnTheWay;
