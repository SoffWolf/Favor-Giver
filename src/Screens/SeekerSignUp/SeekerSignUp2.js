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
} from 'react-native';
import {CheckBox} from 'react-native-elements'

const SeekerSignUp2 = ({navigation}) => {
  return (
    <>
      <View style={{flex:0.8, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
          <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('./FavorGiver.png')} />
          <Text style={{flex:3, flexDirection:'row', fontSize:24, padding:20, paddingTop:25}}>Add information to register as a Seeker!  2/3</Text>        
      </View>


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10 ,fontSize: 18}}>Your Condition:</Text>  
        </View>        
      </View>

            
      <View style={{flex:0.4, flexDirection:'row'}}>        
            <View style={{flex:1.5, flexDirection:'row'}}>        
              <CheckBox
                center
                title='I am healthy.'
              />   
            </View>     
      </View>
      


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <View style={{flex:1.5, flexDirection:'row'}}>        
                <CheckBox
                    center
                    title='I have existing conditions:'
                />   
            </View> 
                 
        </View>        
      </View>
      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:0.1, flexDirection:"row", padding:10}}></Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Please specify. For example: diabetes, alzheimer, ..."
            />     
        </View>        
      </View>

      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <View style={{flex:1.5, flexDirection:'row'}}>        
                <CheckBox
                    center
                    title='I have disability:'
                />   
            </View> 
                 
        </View>        
      </View>
      <View style={{flex:0.8, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:0.1, flexDirection:"row", padding:10}}></Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Please specify. For example: physical impairment, blind, ..."
            />     
        </View>        
      </View>



      

      <View style={{flex:0.5, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
        <View style={{flex:1}}>

        </View>
        <View style={{flex:1}}>
          <Button title='Next ->' color='rgb(255, 148, 77)' style={styles.button}
          onPress={() => navigation.navigate('SeekerSignUp3')}></Button>
        </View>
        <View style={{flex:1}}>

        </View>
      </View>

      
    </>
    
  );
};

const styles=StyleSheet.create({
    whole:{

    },
    image:{
        width:200,
        height:100,
    },
    imageContainer:{
        
    },
    button:{
      justifyContent: 'center',
      alignItems:'center',
      padding: 20,
    },
})

export default SeekerSignUp2;
