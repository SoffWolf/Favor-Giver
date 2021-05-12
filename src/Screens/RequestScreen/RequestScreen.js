/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component, useState} from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';

import {CheckBox} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import MyImagePicker from './ImagePicker';
import { Value } from 'react-native-reanimated';


var seeker = {
  "person": {
      "firstName": "The",
      "lastName": "Joker",
      "phoneNumber": "04511111",
      "address": {
          "address": "My other home"
      },
  },
  "picture" : {
      "url": require("./download.jpeg"),  
  },
  "star" : 3,
}

var seeker_avatar = seeker.picture.url;
var seeker_star;
var i;


switch (seeker.star){
  case 1:
    seeker_star = <>
    <Icon name="star" size={25} color="orange" />
    </>
    break;
  case 2:
    seeker_star = <>
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    </>
    break;
  case 3:
    seeker_star = <>
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    </>
    break;
  case 4:
    seeker_star = <>
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    </>
    break;
  case 5:
    seeker_star = <>
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    <Icon name="star" size={25} color="orange" />
    </>
    break;
}


var task = {
  "seekerID": 1,
  "favorTypeID": "blank",
  "request": {
      "instructions": "blank",
      "seekerLocation": {
          "lat": 1,
          "lng": 2
      }
  },
  "response": {}
}

class RequestScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      task: "",
      estimate_time: "",
      image: "",
      description: "",
    };
    this.myChangeHandler = this.myChangeHandler.bind(this)
  }
  myChangeHandler = (event) => {
    this.setState({estimate_time : event.target.value});
  }
  render(){
    const { navigation } = this.props;
  return (
    <>
      <View style={{flex:0.5, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
          <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('./FavorGiver.png')} />
          <Text style={{flex:2, flexDirection:'row', fontSize:22, padding:20, paddingTop:25}}>
              Your stars:{"\n"}
              {seeker_star}
            </Text>  
          <Image source={seeker_avatar} style={{flex:2, width: 80, height: 80, borderRadius: 80/2, margin: 10}}/>      
      </View>


      <View style={{flex:0.2, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row",fontSize:20, padding:5, justifyContent: 'center', textAlign:'center'}}>YOUR REQUEST:</Text>   
        </View>        
      </View>

            
      <View style={{flex:0.25, flexDirection:'row'}}>  
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Travel somewhere'
                checked = {this.state.task == "travel"}
                onPress = {() => {this.setState({task: "travel"})}}
              />    
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Handy work'
                checked = {this.state.task == "handy"}
                onPress = {() => {this.setState({task: "handy"})}}
              />
        </View>
      </View>
      


      <View style={{flex:0.25, flexDirection:'row'}}>  
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Order online'
                checked = {this.state.task == "order"}
                onPress = {() => {this.setState({task: "order"})}}
              />    
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Fix vehicle'
                checked = {this.state.task == "vehicle"}
                onPress = {() => {this.setState({task: "vehicle"})}}
              />    
        </View>
      </View>


      <View style={{flex:0.25, flexDirection:'row'}}>  
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Collect groceries'
                checked = {this.state.task == "collect"}
                onPress = {() => {this.setState({task: "collect"})}}
              />    
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Fix Furnitutre'
                checked = {this.state.task == "furniture"}
                onPress = {() => {this.setState({task: "furniture"})}}
              />    
        </View>
      </View>


      <View style={{flex:0.25, flexDirection:'row'}}>  
        <View style={{flex: 1, flexDirection: 'column'}}>
              <CheckBox
                center
                title='Technology-related problem'
                checked = {this.state.task == "tech"}
                onPress = {() => {this.setState({task: "tech"})}}
              />    
        </View>
      </View>


      <View style={{flex:0.3, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10}}>Estimate time:</Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Ex. 1 hour"
              onChange={this.myChangeHandler}
              />     
        </View>        
      </View>
      {console.log(this.state.estimate_time)}

      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:'row', padding:10}}>Picture of the problem:</Text>
            <MyImagePicker />     
        </View>        
      </View>


      <View style={{flex:0.4, flexDirection:'row'}}>  
        <View style={{flex:1, flexDirection:'row'}}>        
            <Text style={{flex:1, flexDirection:"row", padding:10}}>Description:</Text>
            <TextInput
              style={{flex:3, flexDirection:"row", height:40, borderBottomColor: '#000000', borderBottomWidth: 0.7,}}
              placeholder="Anything that might helpful to the Helper"
            />     
        </View>        
      </View>


        
      

      <View style={{flex:0.5, flexDirection:'row', backgroundColor: '#fdfdfd'}}>
        <View style={{flex:1}}>

        </View>
        <View style={{flex:1}}>
          <Button title='Send Request' color='rgb(255, 148, 77)' style={styles.button}
          onPress={() => navigation.navigate('SeekerPendingScreen')}></Button>
        </View>
        <View style={{flex:1}}>

        </View>
      </View>

      
    </>
    
  );
}};

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
      marginTop : 15
    },
})

export default RequestScreen;
