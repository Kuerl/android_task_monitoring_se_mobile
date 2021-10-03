import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { loginStyles } from '../styles/LoginStyle';
import * as Animatable from 'react-native-animatable';
import { loginComponentStyle } from '../styles/LoginComponentStyle';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function LoginComponent(
  { animate, setAuth }: { animate:any, setAuth: any }
) {
  return (
    <>
    <Animatable.View style={loginStyles.flex1} animation='fadeIn'>
      <View style={loginComponentStyle.container}>
        <Text style={loginComponentStyle.login__}>SIGN IN</Text>
          <View>
            <View style={loginComponentStyle.login__form__input}>
              <AntDesign name="user" size={35} color="#fff" />
              <TextInput style={loginComponentStyle.login__form__input__}
                placeholder='USERNAME' placeholderTextColor='#666' />
            </View>
            <View style={loginComponentStyle.login__form__input}>
              <AntDesign name="lock" size={35} color="#fff" />
              <TextInput style={loginComponentStyle.login__form__input__}
                placeholder='PASSWORD' placeholderTextColor='#666' />
            </View>
          </View>
          <View style={loginComponentStyle.login__form__submit}>
              <TouchableOpacity onPress={() => {setAuth(true)}}>
                <MaterialIcons name="login" size={60} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>
    </Animatable.View>
    </>
  );
}