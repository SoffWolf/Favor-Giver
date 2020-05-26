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

const SeekerSignUp1: () => React$Node = ({navigation}) => {
  return (
    <>
      <View style={{flex:0.7, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
          <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('./FavorGiver.png')} />
          <Text style={{flex:3, flexDirection:'row', fontSize:24, padding:20, paddingTop:25}}>Add information to register as a Seeker! 1/3</Text>        
      </View>


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10}}>Name:</Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Lastname - Firstname"
            />     
        </View>        
      </View>

            
      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10}}>Gender:</Text>
            <View style={{flex:1.5, flexDirection:'row'}}>        
              
              <CheckBox
                center
                title='Female'
                /> 
              </View>   
              <View style={{flex:1.5, flexDirection:'row'}}>        
              <CheckBox
                center
                title='Male'
              /> 
            </View>    
        </View>        
      </View>
      


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10}}>Date of Birth:</Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="DD/MM/YYYY"
            />     
        </View>        
      </View>
      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10}}>Address:</Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Street, City, Country"
            />     
        </View>        
      </View>
      <View style={{flex:0.6, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1.8, flexDirection:"row", padding:10}}>Postal code:</Text>
            <TextInput
              style={{flex:2, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Ex.550000"
            />     
            <Text style={{flex:1, flexDirection:"row", padding:10}}>City:</Text>
            <TextInput
              style={{flex:2, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Da Nang"
            />    
        </View>        
      </View>



      

      <View style={{flex:0.5, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
        <View style={{flex:1}}>

        </View>
        <View style={{flex:1}}>
          <Button title='Next ->' color='rgb(255, 148, 77)' 
          style={styles.button}
          onPress={() => navigation.navigate('SeekerSignUp2')}
          ></Button>
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

export default SeekerSignUp1;
