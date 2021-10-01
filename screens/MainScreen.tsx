import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import LoginScreen from './login-screen/LoginScreen';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);


import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './splash/SplashScreen';

export default function MainScreen() {
  const [state, setstate] = useState(false);
  
  

  useEffect(() => {
    setTimeout(() => {setstate(true)}, 2900);
    return () => {
      state
    }
  }, [state])
  return (
    <>
      {
        state === true ? <LoginScreen /> : <SplashScreen />
      }
    </>
  );
}
