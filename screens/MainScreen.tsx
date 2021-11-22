import React, { useEffect, useState, useContext } from "react";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "./login-screen/WelcomeScreen";
import SplashScreen from "./splash/SplashScreen";
import HomeScreen from "./home-flow/HomeScreen";

import { AuthStateType, Context as AuthContext } from "../context/AuthContext";

const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function MainScreen() {
  const [baseState, setBaseState] = useState({
    unsplash: false,
  });

  const { state }: { state: AuthStateType } = useContext(AuthContext);

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
      {baseState.unsplash === true && state.authentication == false ? (
        <WelcomeScreen
        // baseState={baseState}
        // setAuth={(e: boolean) =>
        //   setBaseState((prevState) => ({
        //     ...prevState,
        //     authentication: e,
        //   }))
        // }
        />
      ) : baseState.unsplash === true && state.authentication === true ? (
        <HomeScreen />
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
}
