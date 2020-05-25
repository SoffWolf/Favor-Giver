import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image
} from "react-native";

import Button from '~/Components/Button';
import Input from '~/Components/Input';
import CheckBox from '@react-native-community/checkbox';


const HelperCondition = ({navigation}) => {
  const [toggleCheckBox1, setToggleCheckBox1]  = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2]  = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3]  = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [disabilities, setDisabilities] = useState('');

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
        <Text style={{fontFamily: "Karla-Regular", fontSize: 20}}>
            Your conditions:
        </Text>
        <View style={styles.subbody}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox1}
            onValueChange={() => toggleCheckBox1 ? setToggleCheckBox1(false) : setToggleCheckBox1(true)}
          />
          <View style={styles.helper_status}> 
            <Text style={{fontFamily: "Karla-Regular", fontSize: 15}}>I am Healthy</Text>
          </View>
        </View>
        <View style={styles.subbody}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox2}
            onValueChange={() => toggleCheckBox2 ? setToggleCheckBox2(false) : setToggleCheckBox2(true)}
          />
          <View style={styles.helper_status}> 
            <Text style={{fontFamily: "Karla-Regular", fontSize: 15}}>I have existing conditions</Text>
          </View>
        </View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder = "Diabetes, Heart diseases, or etc"
          onChangeText={(symptoms) => {setSymptoms(symptoms)}}
        />
        <View style={styles.subbody}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox3}
            onValueChange={() => toggleCheckBox3 ? setToggleCheckBox3(false) : setToggleCheckBox3(true)}
          />
          <View style={styles.helper_status}> 
            <Text style={{fontFamily: "Karla-Regular", fontSize: 15}}>I have disabilities</Text>
          </View>
        </View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder = "Hearing impair: I need hearind aid"
          onChangeText={(disabilities) => {setDisabilities(disabilities)}}
        />
      </View>  
      <Text>{JSON.stringify(navigation.getParam('data', 'json'))}
      {JSON.stringify(navigation.getParam('data1', 'expertise'))}
      {'\n'}</Text>
      <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
        <View style={styles.button}>   
          <Button 
            style={{ marginBottom: 24}}
            label="<= Back"
            onPress = {() => {
              console.log('Quiz');
              //AsyncStorage.setItem('key', 'JWT_KEY');
              navigation.navigate('HelperCheckbox');
            }}
          />
        </View>      
        <View style={styles.button}>   
          <Button 
            style={{ marginBottom: 24}}
            label="Next =>"
            onPress = {() => {
              //AsyncStorage.setItem('key', 'JWT_KEY');
              var conditions = {"conditions": []}
              if (toggleCheckBox1) {conditions['conditions'].push({'healthy':true})};
              if (toggleCheckBox2) {
                conditions['conditions'].push({'symptoms':true});
                conditions.conditions['symptoms'] = {'short description' : symptoms};
              };
              if (toggleCheckBox3) {
                conditions['conditions'].push({'disabilities': true});
                conditions.conditions['disabilities'] = {'short description': disabilities};
              } ;
              var json = navigation.getParam('data', 'json');
              var expertise = navigation.getParam('data1', 'expertise')
              navigation.navigate('HelperUploadProfile', {
                data: json,
                data1: expertise,
                data2: conditions});
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
  alignContent: 'center',
  paddingLeft: 20,
},
button: {
  flex: 1,
  paddingHorizontal: 20,
  justifyContent: "flex-end",
  marginBottom: 20
},
helper_status: {
  flex: 1,
  paddingHorizontal: 30,
},
subbody: {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
  
}
})

export default HelperCondition;