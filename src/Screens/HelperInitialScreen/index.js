import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView
} from "react-native";
// name should be brought from the server or something 
const HelperInitialScreen = ({navigation}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [buttonColor, setButtonColor] = useState('#D3CABB');
  const [time, setTime] = useState(0);
  var person = navigation.getParam('data', 'json');
  return (
    <ScrollView>
      <View style ={styles.container}>
        <Image source={require('~/Assets/Images/FavorGiver.png')} style={{ width: 70, height: 70,  }} />     
        <Image source={require('~/Assets/Images/Batman.jpg')} style={{width: 130, height: 130, borderRadius: 400/ 2, padding: 20}}/>
        <View style = {{paddingTop: 10, paddingBottom: 15}}>
          <Text style ={{textAlign: 'center', fontSize: 30, fontFamily: 'Rubik-Regular'}}> {person.person.name}</Text> 
        </View> 
        <View>
          <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Karla-Regular'}}> Become a active HELPER {'\n'} and start helping now {'\n'} </Text> 
          <Button
            title = "I am AVAILABLE" 
            onPress = {() => {
              console.log('Simple Button pressed');
              console.log(isAvailable);
              (isAvailable) ? setIsAvailable(false) : setIsAvailable(true);
              (isAvailable) ? setButtonColor('#D3CABB') : setButtonColor('#10D7FC');
            }}
            color = {buttonColor} />
          <View>
            {isAvailable ?  (
              <View>
                <View style={{paddingTop : 10}}>
                  <Text style ={{textAlign: 'center', fontSize: 18, fontFamily: 'Rubik-Regular'}}>How long are you available to help?</Text>
                </View>
                <View style={{paddingTop : 20, paddingHorizontal:   70}}>
                  <TextInput 
                    style = {{height: 40, backgroundColor: '#D3CABB', borderRadius: 5, textAlign: 'center', justifyContent: 'center'}}
                    onChangeText = {(time) => setTime(time)}
                    placeholder ="60 minutes"
                  ></TextInput>
                </View>  
                <View style={{paddingTop : 20, paddingHorizontal: 100}}>
                  <Button
                      title = "START" s
                      onPress = {() => {
                        console.log('helperpendingscreen');
                        navigation.navigate('HelperPendingNavigator');
                      }}
                      color = '#98FB98' />     
                </View> 
              </View>)
            : (<Text>{''}</Text>)}
          </View>
        </View>
      </View>
    </ScrollView>  
    
  );
};

const styles = StyleSheet.create({
  container : {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'

  }
})

export default HelperInitialScreen;