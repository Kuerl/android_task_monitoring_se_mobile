import React from "react";
import { View } from "react-native";
import { globalStyles } from "./constants/GlobalStyle";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainScreen from "./screens/MainScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Provider as AuthProvider } from "./context/AuthContext";

export default function App() {
  const [loaded] = useFonts({
    AllerDisplay: require("./assets/fonts/AllerDisplay.ttf"),
    SansationRegular: require("./assets/fonts/Sansation-Regular.ttf"),
    GloryB: require("./assets/fonts/Glory-Bold.ttf"),
    GloryM: require("./assets/fonts/Glory-Medium.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <LinearGradient
          // Background Linear Gradient
          colors={["#243B55", "#141E30"]}
          style={globalStyles.background}
        />
        <View style={globalStyles.container}>
          <AuthProvider>
            <MainScreen />
          </AuthProvider>
        </View>
      </SafeAreaProvider>
    );
  }
}
