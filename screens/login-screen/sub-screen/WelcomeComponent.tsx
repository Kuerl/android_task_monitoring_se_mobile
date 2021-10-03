import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { loginStyles } from '../styles/LoginStyle';
import * as Animatable from 'react-native-animatable';

export default function WelcomeComponent({ animate }: { animate:any }) {
  return (
    <>
    <View style={loginStyles.flex1}>
      <View style={loginStyles.loginForm__name}>
      <Animatable.Text style={loginStyles.loginForm__name__}
          animation='fadeInUp' delay={200} >
          GREETING
        </Animatable.Text>
        <Animatable.Text style={loginStyles.loginForm__name__}
          animation='fadeInUp' delay={700} >
          FROM
        </Animatable.Text>
        <Animatable.Text style={loginStyles.loginForm__name__}
          animation='fadeInUp' delay={1200} >
          TASK
        </Animatable.Text>
        <Animatable.Text style={loginStyles.loginForm__name__}
          animation='fadeInUp'delay={1700} >
          MONITORING
        </Animatable.Text>
        </View>
      </View>
    </>
  );
}