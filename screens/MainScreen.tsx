import React, { useEffect, useState } from "react";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "./login-screen/WelcomeScreen";
import SplashScreen from "./splash/SplashScreen";
import HomeScreen from "./home-flow/HomeScreen";

const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function MainScreen() {
  const [baseState, setBaseState] = useState({
    authentication: false,
    unsplash: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setBaseState((prevState) => ({
        ...prevState,
        unsplash: true,
      }));
    }, 3000);
    return () => {
      baseState;
    };
  }, [baseState]);
  return (
    <NavigationContainer theme={globalTheme}>
      {baseState.unsplash === true && baseState.authentication == false ? (
        <WelcomeScreen
          baseState={baseState}
          setAuth={(e: boolean) =>
            setBaseState((prevState) => ({
              ...prevState,
              authentication: e,
            }))
          }
        />
      ) : baseState.unsplash === true && baseState.authentication === true ? (
        <HomeScreen />
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
}
