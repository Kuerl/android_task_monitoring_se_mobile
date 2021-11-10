import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { loginStyles } from './styles/LoginStyle';
import { LoginConstant } from '../../constants/WelcomeScreenConstantVariable';

const __logo = require('../../assets/images/atm_logo.png');

export default function LoginScreen(
  {baseState, setAuth} : {baseState: any, setAuth: any}
) {
  const [animate, setAnimate] = useState({
    active: LoginConstant.WELCOME,
  });
  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.__logoquote}>
        <Image source={__logo} />
        <Text style={loginStyles.__logoquote__1} >Android Task Monitoring</Text>
        <Text>cover your life</Text>
      </View>
      <View style={loginStyles.__logoquote}>
        <Text>Connect to social media</Text>
      </View>
      <View style={loginStyles.__logoquote}>
        <Text>Sign In - Sign Up</Text>
      </View>
    </View>
  );
}
