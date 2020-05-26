/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage'

import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Navigator from '~/Screens/Navigator';


const App = () => {
  useEffect(()=>{
    setTimeout(()=> {
      SplashScreen.hide();
    }, 1000);
  }, []);
  
  return (
    <>
      <StatusBar barStyle="light-content" /> 
      <Navigator />
    </>
  );
};

export default App;
