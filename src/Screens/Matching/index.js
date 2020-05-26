
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


const Matching = ({navigation}) => {
  const [request, setRequest] = useState('pickup grocery');
  const [seeker, setSeeker] = useState('Joker');
  const [phonenumber, setPhonenumber] = useState('044-xxxx-xxxx');
  const [duration, setDuration] = useState('30');


  return (
    <ScrollView>
      <View style={styles.container}>  
        <View style={{
          flex: 0.5,
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
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>    
          <Text style ={{color: "#333434", fontFamily: 'Karla_Italic', fontSize: 20, textAlign: 'center', marginHorizontal: 30, marginBottom: 15}}>We have 1 request for help from 4 km away</Text>
        </View>
        <View style= {styles.body}>
          <Text style={styles.textstyle}>Request : {request}</Text>
          <Text style={styles.textstyle}>From : {seeker}</Text>
          <Text style={styles.textstyle}> Tel. : {phonenumber} </Text>
          <Text style={styles.textstyle}>Estimate duration: {duration} mins</Text>
        </View>
        <View style={styles.button}>
          <Button 
          title="start"
          color = "#10D7FC"
          onPress = {() => 
            {console.log("START!!!");
            navigation.navigate("Done")
          }}
          ></Button>
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
      borderRadius: 8,
      backgroundColor: '#F9F4EC', 
      alignContent: 'center',
      marginBottom: 20,
      padding: 15
    },
    textstyle :{
      fontFamily: "Karla-Regular", 
      fontSize: 20,
      marginBottom: 10,
    }
})

export default Matching;
