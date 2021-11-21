import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { globalStyles } from './constants/GlobalStyle';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import MainScreen from './screens/MainScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    AllerDisplay: require('./assets/fonts/AllerDisplay.ttf'),
    SansationRegular: require('./assets/fonts/Sansation-Regular.ttf'),
  });
  if (!loaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaProvider>
      <ImageBackground source={require('./assets/images/background3.jpg')} 
        style={globalStyles.container}
        imageStyle={{opacity: 0.9, backgroundColor: '#000000'}}>
          <MainScreen />
      </ImageBackground>
    </SafeAreaProvider>
  )}
}
