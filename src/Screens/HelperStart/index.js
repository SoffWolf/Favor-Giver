import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Button from '~/Components/Button'

              
const HelperStart = (navigation) => {  
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fdfdfd'
    }}>

      <Image source={require('~/src/Assets/Images/FavorGiver.png')} style={styles.logo}/>
      <Image source={require('./download.jpeg')} style={{width: 200, height: 200, borderRadius: 400/ 2, padding: 50}}/>
      <Text style={{fontSize:30}}>The Joker</Text>
      <Text style= {{fontSize:25}}>Become an active HELPER and start helping now</Text>
      <Button label='I am Available' color='rgb(255, 148, 77)'></Button>
      <Text style= {{fontSize:25}}>How long are you available to help?</Text>
      <Button label ='60 minutes' color='rgb(255, 148, 77)' ></Button>
      <Button label ='Start'></Button>

    </View>
  );
};

const styles=StyleSheet.create({
    logo:{
      height: 100,
      width: 200,
      
    },
    button:{
      marginTop: 20,
      paddingTop:20,
    },
    textButton:{
      color:'black',
    }
})

export default SeekerSignUp;
