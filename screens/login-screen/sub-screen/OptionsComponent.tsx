import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { loginStyles } from '../styles/LoginStyle';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { LoginConstant } from '../../../constants/WelcomeScreenConstantVariable';

export default function OptionsComponent({
    animate, setAnimate }: { animate:any, setAnimate: any
  }) {
  return (
    <>
      <Animatable.View style={loginStyles.loginForm} animation='fadeIn'>
          <View style={loginStyles.buttonView}>
            {
              animate.active === LoginConstant.REGISTER ?
              null :
              <View style={loginStyles.viewIcon}>
                  <TouchableOpacity style={loginStyles.button}
                    onPress={() => {setAnimate(LoginConstant.REGISTER);
                    }}>
                    <MaterialIcons name="assignment" size={30} color="black" />
                  </TouchableOpacity>
              </View>
            }
            {
              animate.active === LoginConstant.LOGIN? 
               null :
               <View style={loginStyles.viewIcon}>
                <TouchableOpacity style={loginStyles.button}
                  onPress={() => {setAnimate(LoginConstant.LOGIN);
                  }}>
                    <MaterialIcons name="login" size={30} color="black" />
                </TouchableOpacity>
              </View>
            }
            {
              animate.active === LoginConstant.MORE ?
              null :
              <View style={loginStyles.viewIcon}>
                <TouchableOpacity style={loginStyles.button}
                  onPress={() => {setAnimate(LoginConstant.MORE);
                  }}>
                  <Feather name="more-horizontal" size={30} color="black" />
                </TouchableOpacity>
              </View>
            }
        </View>
      </Animatable.View>
    </>
  );
}