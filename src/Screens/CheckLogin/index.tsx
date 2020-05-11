import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #141414;
  justify-content: center;
  align-items: center;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

// just to delete the stored keys and values in asyncstorage in the beginning
const clearAppData = async function() {
  try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
  } catch (error) {
      console.error('Error clearing app data.');
  }
}

const CheckLogin = ({ navigation }: Props) => {
  clearAppData;
  console.log("Here we are!")
  AsyncStorage.getItem('key')
    .then(value => {
      if (value) /*{
        console.log('navigate to helper Navigator')
        navigation.navigate('HelperNavigator');
      } else */{
        console.log('navigate to Login Navigator')
        navigation.navigate('LoginNavigator');
      }
    })
    .catch((error: Error) => {
      console.log(error);
    });
    
    return (
      <Container>
        <ActivityIndicator size="large" color="#70915" />
      </Container>
    );
};

//setting in order to not show the header of the navigation during the loading time.
CheckLogin.navigationOptions = {
  header: null,
};

export default CheckLogin;