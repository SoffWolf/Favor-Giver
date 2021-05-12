import React, { useState } from "react";
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image
} from "react-native";

import Button from '~/Components/Button';
import CheckBox from '@react-native-community/checkbox';
import FixFurniture from "../FixFurniture";


const HelperCheckbox = ({navigation}) => {
  const [toggleCheckBox1, setToggleCheckBox1]  = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2]  = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3]  = useState(false);
  const [toggleCheckBox4, setToggleCheckBox4]  = useState(false);

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style = {{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <View style ={{flex: 1}}>
          <Image source={require('~/Assets/Images/FavorGiver.png')} 
            style={{ width: 90, height: 90 }} />
        </View>
        <View style = {{flex:2.5 }}>
          <Text style ={{textAlign: 'center', fontSize: 20, fontFamily: 'Rubik-Bold'}}>Registration Form</Text>
        </View>
      </View>
      <View style = {styles.body}>
        <Text style={{fontFamily: "Karla-Regular", textAlign: 'center', fontSize: 25}}>
            I can help with:
        </Text>
        <Text style={{fontFamily: "Karla-Regular", textAlign: 'center', fontSize: 17}}>
          (more than one option can be chosen)
          {"\n"}
        </Text>
        <View style={styles.checkbox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox1}
            onValueChange={() => toggleCheckBox1 ? setToggleCheckBox1(false) : setToggleCheckBox1(true)}
          />
          <View style={styles.info_button}>   
            <Button 
                label = "Fix Furniture" 
                onPress = {() => {navigation.navigate('FixFurniture');
              }}
            />
            </View>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox2}
            onValueChange={() => toggleCheckBox2 ? setToggleCheckBox2(false) : setToggleCheckBox2(true)}
          />
          <View style={styles.info_button}>   
            <Button 
                label = "Fix Vehicles" 
                onPress = {() => {
                  navigation.navigate('FixVehicle' );
              }}
            />
            </View>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox3}
            onValueChange={() => toggleCheckBox3 ? setToggleCheckBox3(false) : setToggleCheckBox3(true)}
          />
          <View style={styles.info_button}>   
            <Button 
                label = "Computer Related Tasks" 
                onPress = {() => {navigation.navigate('ComputerRelatedTask');
              }}
            />
            </View>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox4}
            onValueChange={() => toggleCheckBox4 ? setToggleCheckBox4(false) : setToggleCheckBox4(true)}
          />
          <View style={styles.info_button}>   
            <Button 
                label = "General Tasks" 
                onPress = {() => {navigation.navigate('GeneralTask');
              }}
            />
            </View>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
        <View style={styles.button}>   
          <Button 
            style={{ marginBottom: 24}}
            label="<= Back"
            onPress = {() => {
              console.log('Quiz');
              //AsyncStorage.setItem('key', 'JWT_KEY');
              navigation.navigate('HelperRegistration');
            }}
          />
        </View>      
        <View style={styles.button}>   
          <Button 
            style={{ marginBottom: 24}}
            label="Next =>"
            onPress = {() => {
              var expertise = {"expertises": []}
              if (toggleCheckBox1) {expertise['expertises'].push({'id':"FixFurniture"})};
              if (toggleCheckBox2) {expertise['expertises'].push({'id':"FixVehicle"})};
              if (toggleCheckBox3) {expertise['expertises'].push({'id': "ComputerRelatedTasks"})} ;
              if (toggleCheckBox4) {expertise['expertises'].push({'id': "GeneralTask"})};
              //AsyncStorage.setItem('key', 'JWT_KEY');
              var json = navigation.getParam('data', 'json');
              navigation.navigate('HelperUploadProfile', {
                data: json,
                data1: expertise,
              });
            }}
          />
        </View>  
      </View>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 10,
},
body:{
  flex: 4,
  padding: 5,
  backgroundColor: '#F9F4EC',
  alignContent: 'center'
},
button: {
  flex: 1,
  paddingHorizontal: 20,
  justifyContent: "flex-end",
  marginBottom: 20
},
info_button: {
  flex: 1,
  paddingHorizontal: 30,
},
checkbox: {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 20
}
})

export default HelperCheckbox;