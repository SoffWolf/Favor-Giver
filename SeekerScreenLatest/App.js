/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import SeekerSignUp1 from './Screens/SeekerSignUp/SeekerSignUp1'
import SeekerSignUp2 from './Screens/SeekerSignUp/SeekerSignUp2'
import SeekerSignUp3 from './Screens/SeekerSignUp/SeekerSignUp3'
import SeekerStart from './Screens/SeekerStart/SeekerStart'
import RequestScreen from './Screens/RequestScreen/RequestScreen'
import PendingScreen from './Screens/PendingScreen/PendingScreen'
import OnTheWayScreen from './Screens/OnTheWayScreen/OnTheWayScreen'
import FeedbackScreen from './Screens/FeedbackScreen/FeedbackScreen'
import ArrivedScreen from './Screens/ArrivedScreen/ArrivedScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import StopWatch from './Components/stopwatch'


const RootStack = createStackNavigator(
  {
    SeekerSignUp1: SeekerSignUp1,
    SeekerSignUp2: SeekerSignUp2,
    SeekerSignUp3: SeekerSignUp3,
    SeekerStart : SeekerStart,
    RequestScreen : RequestScreen,
    PendingScreen : PendingScreen,
    OnTheWayScreen: OnTheWayScreen,
    FeedbackScreen: FeedbackScreen,
    ArrivedScreen : ArrivedScreen,
  },
  {
    headerMode : 'none'
  },
  {
    initialRouteName: 'SeekerSignUp1',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
