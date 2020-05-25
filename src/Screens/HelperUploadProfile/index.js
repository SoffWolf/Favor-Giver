import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from "react-native";

import Button from '~/Components/Button';
import RedButton from '~/Components/RedButton';

import CheckBox from '@react-native-community/checkbox';

const HelperUploadProfile = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [text, setText] = useState('');

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style = {{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <View style ={{flex: 1}}>
          <Image source={require('~/Assets/Images/FavorGiver.png')} 
            style={{ width: 90, height: 90 }} />
        </View>
        <View style = {{flex:2.5 }}>
          <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Rubik-Bold'}}>Registration Form</Text>
        </View>
      </View>
      <View style={styles.split}>
        <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Karla-Regular'}}>Profile picture: </Text>
        <View style={styles.uploadfile}>
          <Button
            label="Upload file"
            onpress = {() => {}}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', flex: 1, paddingVertical:5}}>
        <Image source={require('~/Assets/Images/Batman.jpg')} style={{width: 130, height: 130, borderRadius: 400/ 2, padding: 20}}/>
      </View>
      <View style ={{flex: 1, paddingBottom:5}}>
        <Text style ={{textAlign: 'left', fontSize: 20, fontFamily: 'Karla-Regular'}}>A few words about yourself:</Text>
      </View>
      <View style ={{flex: 1, paddingBottom:10}}>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = "e.g. list your skills!"
            onChangeText = {(text) => setText(text)}
        />
      </View>
      <View style={styles.button}>
        <Button
          label="<= Back"
          onPress = {() => {
            console.log('HelperCheckbox');
            navigation.navigate('HelperCheckbox');
          }}
        />
      </View>
      <View style={styles.split}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
          />
          <Text style={{fontFamily: "Karla-Regular", fontSize: 17, textAlignVertical: 'center'}}>I agree with the terms and conditions</Text>
      </View>
      <View style={{flex:1, paddingHorizontal: 80, paddingBottom: 12}}>
        <Button
          label="save and submit"
          onPress = {() => {
            if (toggleCheckBox) {
              var json = navigation.getParam('data', 'json');
              var expertise = navigation.getParam('data1', 'expertise');
              var shortDescription = {
                "shortDescription" : text
              }
              navigation.navigate('HelperInitialScreen', {
                data: json,
                data1: expertise,
                data2: shortDescription,
                });
            } else{
              Alert.alert('Check the terms and conditions');
            }
          }}
        />
      </View>
      <View style={styles.button}>
        <RedButton
          label="cancel"
          onPress = {() => {
            console.log('HomeScreen');
            navigation.navigate('HomeScreen');
          }}
        />
      </View>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 10
  },
  split: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5
  },
  uploadfile:{
    flex:1,
    paddingHorizontal: 25,
  },
  button: {
    flex: 0.5,
    paddingHorizontal: 120,
  }
})


export default HelperUploadProfile;