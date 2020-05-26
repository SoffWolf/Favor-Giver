
import React from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome'




function padding1(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}


const Feedback = () => {
  return (
    <ScrollView>
    <View style={{
      flex: 0.8,
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


    <View style={{flex:0.7, backgroundColor: '#fdfdfd'}}>
    </View>



    <View style={{flex:3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
        <Text style={{fontSize:28, marginBottom: 5}}>Please rate your experience</Text>
        <Text>
            <Icon name="star" size={35} color="orange" />
            <Icon name="star" size={35} color="orange" />
            <Icon name="star" size={35} color="orange" />
            <Icon name="star" size={35} color="orange" />
            <Icon name="star" size={35} color="orange" />
        </Text>
        <Text style={{fontSize:25, marginTop: 20}}>
            Feedback(Optional)
        </Text>
        <View style={{flexDirection:'row' ,justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd', height:150}}>
            <View style={{flex:1}}>

            </View>
            <TextInput 
                    multiline={true}
                style={{flex:5, flexDirection:"column", marginTop:10, marginBottom:20, borderColor: 'rgb(210, 210, 224)', borderWidth:0.8, alignItems:'stretch'}}
                placeholder={"\n\n\n\n\n"}
                />  
            <View style={{flex:1}}>

            </View>
        </View>
            <TouchableOpacity style={styles.button}  >
              <Text style={styles.buttonText}>DONE</Text>
            </TouchableOpacity>
    </View>


    
      
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfdfd'}}>
       
    </View>
    </ScrollView>
  );
};

const styles=StyleSheet.create({
    logo:{
      height: 100,
      width: 200,
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    button:{
        width: 150,
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:10  
    },
    button2:{
        width: 250,
        height: 60,
        backgroundColor: 'rgb(255, 51, 51)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12 ,
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff'
      }
})

export default Feedback;
