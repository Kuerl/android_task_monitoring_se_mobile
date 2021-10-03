import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { loginStyles } from '../styles/LoginStyle';
import * as Animatable from 'react-native-animatable';
import { loginComponentStyle } from '../styles/LoginComponentStyle';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function RegisterComponent({ animate }: { animate:any }) {
  return (
    <>
    <Animatable.View style={loginStyles.flex1} animation='fadeIn'>
      <View style={loginComponentStyle.container}>
        <Text style={loginComponentStyle.login__}>SIGN UP</Text>
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
            <View style={loginComponentStyle.login__form__input}>
            <MaterialIcons name="drive-file-rename-outline" size={35} color="#fff" />
              <TextInput style={loginComponentStyle.login__form__input__}
                placeholder='FIRSTNAME' placeholderTextColor='#666' />
            </View>
            <View style={loginComponentStyle.login__form__input}>
            <MaterialIcons name="drive-file-rename-outline" size={35} color="#fff" />
              <TextInput style={loginComponentStyle.login__form__input__}
                placeholder='LASTNAME' placeholderTextColor='#666' />
            </View>
          </View>
          <View style={loginComponentStyle.login__form__submit}>
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons name="assignment" size={60} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>
    </Animatable.View>
    </>
  );
}