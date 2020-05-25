import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image
} from "react-native";

import Button from '~/Components/Button';
import Datetimepicker from '~/Components/Datetimepicker';
import {Picker} from '@react-native-community/picker';


class HelperRegistration extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      gender: 'Male',
      name: '',
      date: new Date(2020, 5, 18),
      address: '',
      postalcode: '',
      city: '',
    }

  }
  render() {
    const {navigation} = this.props
    const {gender, name, date, address, postalcode, city} = this.state;

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

          <View style = {styles.formContainer}>
            <Text style={styles.text}>Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
            />  
          </View>

          <View style = {styles.formContainer}>
            <Text style={styles.text}>Gender:</Text>
            <Picker
              selectedValue={gender}
              style={{height: 40, width: '50%', fontFamily: 'Karla-Regular', fontSize: 20}}
              onValueChange={(itemValue, itemIndex) =>this.setState({gender: itemValue})}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <View style = {styles.formContainer}>
            <Text style ={styles.text}>Date of birth:</Text>
            <Datetimepicker></Datetimepicker>
          </View>
          <View style = {styles.formContainer}>
            <Text style={styles.text}>Address:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(address) => {this.setState({address})}
              }
            />  
          </View>
          <View style = {styles.formContainer}>
            <Text style={styles.text}>Postal Code:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(postalcode) => {this.setState({postalcode})
              }}
            />  
          </View>
          <View style = {styles.formContainer}>
            <Text style={styles.text}>City:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(city) => {this.setState({city})}
              }
            />  
          </View>
          <View style={styles.button}>   
            <Button 
              style={{ marginBottom: 24}}
              label="Next =>"
              onPress = {() => {
                console.log('Helperchoose');
                //AsyncStorage.setItem('key', 'JWT_KEY');
                var json = {
                  "person" : {
                    "name": this.state.name,
                    "gender": this.state.gender,
                    "address": this.state.address,
                    "postalcode" : this.state.postalcode,
                    "city":this.state.city,
                  }
                }
                navigation.navigate('HelperCheckbox', {
                  data:json});

              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10
  },
  text: {
    width: '40%',
    height: 40,
    fontFamily: 'Karla-Regular',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: '60%',
    height: 40,
    alignSelf: "stretch"
  },
  error: {
    position: "absolute",
    bottom: 0,
    color: "red",
    fontSize: 12
  },
  button: {
    flex: 1,
    paddingHorizontal: 130,
    justifyContent: "flex-end",
    marginBottom: 20
  }
})

export default HelperRegistration;  
