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
import MyImagePicker from './ImagePicker';


const SeekerSignUp2: () => React$Node = ({navigation}) => {
  return (
    <>
    
      <View style={{flex:0.9, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
          <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('./FavorGiver.png')} />
          <Text style={{flex:3, flexDirection:'row', fontSize:24, padding:20, paddingTop:25}}>Add information to register as a Seeker!  3/3</Text>        
      </View>


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10 ,fontSize: 18}}>Profile picture:</Text>  
        </View>        
      </View>

            
      <View style={{flex:1.5, flexDirection:'row'}}>
      <View style={{flex:0.5}}>

      </View>
      <View style={{flex:2, paddingBottom: 20}}>
        <MyImagePicker />
      </View>
      <View style={{flex:0.5}}>

      </View>
      </View>

      
      <View style={{flex:0.5, flexDirection:'row'}}>  
        <Text style={{flex:1, flexDirection:"row", padding:10 ,fontSize: 18, paddingTop: 30}}>A few more words about yourself</Text>        
      </View>


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:0.1, flexDirection:"row", padding:10}}></Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="For example: your hobby, your dream, ..."
            />     
        </View>        
      </View>

      
      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <CheckBox
                center
                title='I agree with the Terms & Conditions.'
              />    
        </View>        
      </View>




      

      <View style={{flex:0.5, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
        <View style={{flex:1}}>

        </View>
        <View style={{flex:1}}>
          <Button title='Save & Submit' color='rgb(255, 148, 77)' style={styles.button}
          onPress={() => navigation.navigate('SeekerStart')}></Button>
        </View>
        <View style={{flex:1}}>

        </View>
      </View>

      
    </>
    
  );
};

const styles=StyleSheet.create({
    image:{
        width:200,
        height:100,
    },
    imageContainer:{
        
    },
    
})

export default SeekerSignUp2;
