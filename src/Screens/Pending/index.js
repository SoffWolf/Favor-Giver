import React, {Component} from "react";
import { ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import RedButton from '~/Components/RedButton';


class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      animating: true,
    }
  }
  closeActivityIndicator = () => {
    const {navigation} = this.props;
    setTimeout(() => {
      this.setState({animating : false});
      navigation.navigate("Matching");
      }, 6000);
  } 
  componentDidMount = () => this.closeActivityIndicator()
  render () {
    const {navigation} = this.props;
    const {data} = this.state.data;
    const animating = this.state.animating  
    return( 
      <View style={[styles.container]}>
        <Image source={require('~/Assets/Images/FavorGiver.png')} style={{ width: 100, height: 100,  }} />     
        <Image source={require('~/Assets/Images/Batman.jpg')} style={{width: 130, height: 130, borderRadius: 400/ 2, padding: 20}}/>
        {{animating} ? <ActivityIndicator 
          animating = {animating}
          size='large'
          color="#0000ff"
          style = {styles.activityIndicator}/> : <Text>HI</Text>}
        <Text style ={{color: "#333434", fontFamily: 'Karla_Italic', fontSize: 20, textAlign: 'center'}}>please wait while we connect you</Text>
        <View style={styles.button}>
          <RedButton 
          label = 'cancel'
          onPress = {() => {
            navigation.navigate('FeedbackNavigator');
          }}></RedButton>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  activityIndicator :{
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 80
  }
});

export default Pending
