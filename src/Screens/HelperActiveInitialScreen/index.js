import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image
} from "react-native";



// name should be brought from the server or something 
const HelperActiveInitialScreen = () => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  return (
    <View style ={styles.container}>
      <Image source={require('~/Assets/Images/FavorGiver.png')} style={{ width: 70, height: 70,  }} />     
      <Image source={require('~/Assets/Images/Batman.jpg')} style={{width: 130, height: 130, borderRadius: 400/ 2, padding: 20}}/>
      <View style = {{paddingTop: 10, paddingBottom: 15}}>
        <Text style ={{textAlign: 'center', fontSize: 30, fontFamily: 'Rubik-Regular'}}> Name </Text> 
      </View> 
      <View style = {{justifyContent: 'space-between'}}>
        <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Karla-Regular'}}> Become a active HELPER {'\n'} and start helping now {'\n'} </Text> 
        <Button
          title = "I am AVAILABLE" 
          onPress = {() => console.log('Simple Button pressed')}
          color = '#D3CABB' />
        <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Karla-Regular'}}>How long are you available to help?</Text>
        <TextInput 
          style = {{height: 40, borderColor: 'gray',  borderWidth: 1}}
          onChangeText = {text => onChangeText(text)}
          placeholder ="60 minutes"
        ></TextInput>
        <Button
            title = "START" 
            onPress = {() => console.log('Simple Button pressed')}
            color = '#D3CABB' />
      </View>

    </View>
    
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

export default HelperActiveInitialScreen;