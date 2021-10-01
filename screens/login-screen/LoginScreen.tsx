import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { loginStyles } from './styles/LoginStyle';
import { MaterialIcons, Feather  } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';

export default function LoginScreen() {
  return (
    <Animatable.View style={loginStyles.container} animation='zoomInDown'>
      <View style={loginStyles.flex1}>
      <View style={loginStyles.loginForm__name}>
        <Text style={loginStyles.loginForm__name__}>GREETING</Text>
        <Text style={loginStyles.loginForm__name__}>FROM</Text>
        <Text style={loginStyles.loginForm__name__}>TASK</Text>
        <Text style={loginStyles.loginForm__name__}>MONOTORING</Text>
      </View>
      </View>
        <View style={loginStyles.loginForm}>
          <View style={loginStyles.buttonView}>
            <View style={loginStyles.viewIcon}>
                <TouchableOpacity style={loginStyles.button}>
                  <MaterialIcons name="assignment" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={loginStyles.viewIcon}>
              <TouchableOpacity style={loginStyles.button}>
                  <MaterialIcons name="login" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={loginStyles.viewIcon}>
              <TouchableOpacity style={loginStyles.button}>
                <Feather name="more-horizontal" size={30} color="black" />
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Animatable.View>
  );
}
