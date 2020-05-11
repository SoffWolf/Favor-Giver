import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Linking} from 'react-native';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import Background from '~/Components/Background';
import Logo from '~/Components/Logo';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const FormContainer = Styled.View`
  width: 100%;
  padding: 100px;
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

const Login = ({navigation}: Props) => {
  return (
    <Container>
      <Logo></Logo>
      <FormContainer>
        <Input style={{ marginBottom: 16}} placeholder= "ID" />
        <Input 
        style ={{marginBottom: 16}}
        placeholder = "password"
        secureTextEntry={true}
        />
        <Button 
          style={{ marginBottom: 24}}
          label="login"
          onPress = {() => {
            console.log('test');
            //AsyncStorage.setItem('key', 'JWT_KEY');
            navigation.navigate('HelperNavigator');
          }}
        />
        <PasswordReset
        onPress={ ()=> {
          Linking.openURL('https://dev-yakuza.github.io/ko/');
        }}>
          reset passwrod
        </PasswordReset>
      </FormContainer>
    </Container>
  );
};

Login.navigationOptions = {
  title: 'APP',
  headerTransparent: true,
  headerTintColor: '#111111',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
};

export default Login;