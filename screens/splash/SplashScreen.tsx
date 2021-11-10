import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { globalStyles } from '../../constants/GlobalStyle';
import { splashScreenStyle } from './styles/SplashScreenStyle';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen() {
  return (
    <View
      style={splashScreenStyle.container}
      // imageStyle={{opacity: 0.9, backgroundColor: '#000000'}}
      >
        <Animatable.View animation='zoomIn' delay={500}>
          <Animatable.View animation='zoomOut' delay={2500}>
            <Image style={splashScreenStyle.logo}
              source={require('../../assets/images/atm_logo.png')} />
          </Animatable.View>
        </Animatable.View>
    </View>
  );
}
