
import React, { useState } from 'react';
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
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function padding1(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}


const Done = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>  
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'
        }}>
            <Image style={{flex:2, flexDirection:'row', height:100, width:200}} source={require('~/Assets/Images/FavorGiver.png')} />
              <Text style={{flex:2, flexDirection:'row', fontSize:24, padding:20, paddingTop:25}}>
                  Your stars:{"\n"}
                  <Icon name="star" size={25} color="orange" />
                  <Icon name="star" size={25} color="orange" />
                  <Icon name="star" size={25} color="orange" />
                </Text>  
              <Image source={require('~/Assets/Images/Batman.jpg')} style={{flex:2, width: 80, height: 80, borderRadius: 80/2, margin: 10}}/>  
        </View>
        <View style= {styles.body}>
          <Text style={styles.textstyle}>The request is fulfilled</Text>
          <View style={styles.button}>
            <Button 
            title="Done"
            color = "#10D7FC"
            onPress = {() => 
              {console.log("Done!!!");
              navigation.navigate("Feedback")
            }}
            ></Button>
          </View>
        </View>

      </View>  
    </ScrollView>
  );
};

const styles=StyleSheet.create({
    container:{
      flex: 1,
      margin: 10,
    },
    logo:{
      height: 100,
      width: 200,
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    button:{
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingHorizontal: 100,
        marginBottom:10  
    },
    body: {
      flex: 4,
      borderRadius: 8,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: '#F9F4EC', 
      alignContent: 'center',
      marginBottom: 20,
      padding: 15
    },
    textstyle :{
      textAlign: 'center',
      fontFamily: "Karla-Regular", 
      fontSize: 25,
      marginBottom: 50,
    }
})

export default Done;
