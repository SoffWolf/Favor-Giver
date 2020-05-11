import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Linking} from 'react-native';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import Logo from '~/Components/Logo';


const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const FormContainer = Styled.View`
  width: 100%;
  padding: 40px;
`;

const WelcomeMessage = Styled.Text`
  width: 100%;
  font-size: 20px;
  color: #4bc5fa;
  text-align: center;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  font-size: 12px;
  color: #4bc5fa;
  text-align: center;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const HomeScreen = ({navigation}: Props) => {
  return (
    <Container>
      <WelcomeMessage>
        Welcome to
      </WelcomeMessage>
      <Logo></Logo>
      <FormContainer>
        <Button 
          style={{ marginBottom: 24}}
          label="Register as a seeker"
          onPress = {() => {
            console.log('register as a seeker');
            //AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('SeekerNavigator');
          }}          
        />
        <Button 
          style={{ marginBottom: 24}}
          label="Register as a helper"
          onPress = {() => {
            console.log('Register as a helper');
            //AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('HelperNavigator');
          }}          
        />
        <Button 
          style={{ marginBottom: 24}}
          label="Log In"
          onPress = {() => {
            console.log('Login');
            //AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('LoginNavigator');
          }}          
        />        
      </FormContainer>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;