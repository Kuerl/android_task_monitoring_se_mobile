import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { loginStyles } from '../styles/LoginStyle';
import * as Animatable from 'react-native-animatable';
import { loginComponentStyle, moreComponent } from '../styles/LoginComponentStyle';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

export default function MoreComponent({ animate }: { animate:any }) {
  return (
    <>
    <Animatable.View style={loginStyles.flex1} animation='fadeIn'>
      <View style={loginComponentStyle.container}>
        <Text style={loginComponentStyle.login__}>MORE OPTIONS</Text>
          <View>
            <View style={moreComponent.login__form__input}>
              <AntDesign name="infocirlce" size={35} color="#fff" />
              <TouchableOpacity onPress={() => {}} style={loginComponentStyle.login__form__input__}>
                <Text style={moreComponent.more__text}>SEE MORE</Text>
              </TouchableOpacity>
            </View>
            <View style={moreComponent.login__form__input}>
              <AntDesign name="setting" size={35} color="#fff" />
              <TouchableOpacity onPress={() => {}} style={loginComponentStyle.login__form__input__}>
                <Text style={moreComponent.more__text}>SETTING</Text>
              </TouchableOpacity>
            </View>
            <View style={moreComponent.login__form__input}>
            <Feather name="more-horizontal" size={35} color="#fff" />
            <TouchableOpacity onPress={() => {}} style={loginComponentStyle.login__form__input__}>
                <Text style={moreComponent.more__text}>TESTING MORE OPTS</Text>
              </TouchableOpacity>
            </View>
            <View style={moreComponent.login__form__input}>
              <AntDesign name="logout" size={35} color="#fff" />
              <TouchableOpacity onPress={() => {}} style={loginComponentStyle.login__form__input__}>
                <Text style={moreComponent.more__text}>QUIT</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </Animatable.View>
    </>
  );
}