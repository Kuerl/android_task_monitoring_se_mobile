import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { loginStyles } from "../screens/login-screen/styles/LoginStyle";

export default function WelcomeComponent() {
  return (
    <View style={loginStyles.loginForm__name}>
      <Text style={loginStyles.loginForm__name__}>GREETING</Text>
      <Text style={loginStyles.loginForm__name__}>FROM</Text>
      <Text style={loginStyles.loginForm__name__}>TASK</Text>
      <Text style={loginStyles.loginForm__name__}>MONOTORING</Text>
    </View>
  );
}