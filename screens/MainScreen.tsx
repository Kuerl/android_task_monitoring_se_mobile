import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import LoginScreen from './login-screen/LoginScreen';


import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './splash/SplashScreen';
import HomeScreen from './home-screen/HomeScreen';

export default function MainScreen() {
  const [baseState, setBaseState] = useState({
    authentication: false,
    unsplash: false,
  });
  
  useEffect(() => {
    setTimeout(() => {
      setBaseState(
        prevState => ({
          ...prevState, unsplash: true
        })
      )}, 3000);
    return () => {
      baseState
    }
  }, [baseState])
  return (
    <>
      {
        (baseState.unsplash === true && baseState.authentication == false) ?
          <LoginScreen baseState={baseState} setAuth={
            (e: boolean) => setBaseState(prevState => ({
              ...prevState,
              authentication: e,
            }))}
          /> :
          (baseState.unsplash === true && baseState.authentication === true) ?
            <HomeScreen />:
            <SplashScreen />
      }
    </>
  );
}
