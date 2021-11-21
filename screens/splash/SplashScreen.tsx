import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { globalStyles } from '../../constants/GlobalStyle';
import { splashScreenStyle } from './styles/SplashScreenStyle';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen() {
  const state = { back: false }
  return (
    <View
      style={splashScreenStyle.container}
      // imageStyle={{opacity: 0.9, backgroundColor: '#000000'}}
      >
        <Animatable.View animation='zoomIn' delay={500}>
          <Animatable.View animation='zoomOut' delay={2500}>
            <Animatable.Image style={splashScreenStyle.logo} animation={{
                from: {
                  transform: [{ rotate: state.back?'0deg': '360deg'}]
                  },
                  to: {
                      transform: [{ rotate: state.back?'360deg' : "deg0"}]
                  }
              }}
              source={require('../../assets/images/atm_logo.png')} />
          </Animatable.View>
        </Animatable.View>
    </View>
  );
}
