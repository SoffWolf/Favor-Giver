import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {Linking} from 'react-native';
import Styled from 'styled-components/native';

import Button from '~/Components/Button';
import Logo from '~/Components/Logo';


const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: space-around;
`;

const FormContainer = Styled.View`
  width: 100%;
  padding: 30px;
`;

const ButtonContainer = Styled.View`
  align-items: center;
  paddingHorizontal: 50px;
  
`;
const WelcomeMessage = Styled.Text`
  width: 100%;
  font-size: 40px;
  color: #000000;
  text-align: center;
  font-family: "Rubik-Italic";
`;

const PasswordReset = Styled.Text`
  width: 100%;
  font-size: 12px;
  color: #4bc5fa;
  text-align: center;
`;

const Description = Styled.Text`
  width: 100%;
  font-size: 20px;
  color: #000000;
  text-align: center;
  font-family: "Karla-Italic";
  padding-bottom: 13px;
`;


                      
const HomeScreen = ({navigation}) => {
  return (
    <Container>
      <WelcomeMessage>
        Welcome to
      </WelcomeMessage>
      <Logo></Logo>
      <FormContainer>
        <Description>______I need Assistance_____</Description>
        <ButtonContainer>
          <Button 
            style={{ marginBottom: 24}}
            label="Register as a seeker"
            onPress = {() => {
              console.log('register as a seeker');
              //AsyncStorage.setItem('key', 'JWT_KEY');
              navigation.navigate('SeekerNavigator');
            }}          
          />
        </ButtonContainer>
        <Description>_____I'd like to volunteer_____</Description>
          <ButtonContainer>
            <Button 
            style={{ marginBottom: 24}}
            label="Register as a helper"
            onPress = {() => {
              console.log('Register as a helper');
              //AsyncStorage.setItem('key', 'JWT_KEY');
              navigation.navigate('HelperRegistration');
            }}          
          />
        </ButtonContainer>
        <Description>___Already have an account___</Description>
        <ButtonContainer>    
          <Button 
            style={{ marginBottom: 24}}
            label="Log In"
            onPress = {() => {
              console.log('Login');
              //AsyncStorage.setItem('key', 'JWT_KEY');
              navigation.navigate('LoginsNavigator');
            }}          
          />     
        </ButtonContainer>   
      </FormContainer>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;