import React, { useState } from "react";
import { View, Text } from "react-native";
import { welcomeStyles } from "./styles/WelcomeStyle";
import __logo from "../../assets/images/atm_logo.png";
import ConnectMediaComponent from "../../components/ConnectMediaComponent";
import __logo__fb from "../../assets/images/__logo__fb.png";
import __logo__gg from "../../assets/images/__logo__google.png";
import SignComponent from "../../components/SignComponent";
import * as Animatable from "react-native-animatable";
import { signform } from "../../constants/Constant";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function WelcomeScreen() {
  const [form, setForm] = useState(signform.none);
  const rotate = { back: false };

  return (
    <View style={welcomeStyles.container}>
      {form === signform.none ? (
        <>
          <View style={welcomeStyles.__logoquote}>
            <Animatable.Image
              source={__logo}
              style={welcomeStyles.__logoquote__logo}
              animation={{
                from: {
                  transform: [{ rotate: rotate.back ? "0deg" : "360deg" }],
                },
                to: {
                  transform: [{ rotate: rotate.back ? "360deg" : "deg0" }],
                },
              }}
            />
            <Text style={welcomeStyles.__logoquote__1}>
              Android Task Monitoring
            </Text>
            <Text style={welcomeStyles.__logoquote__2}>cover your life</Text>
          </View>
          <View style={welcomeStyles.__connectmedia}>
            <Text style={welcomeStyles.__cmquote}>Connect to social media</Text>
            <View style={welcomeStyles.__connectmediabtn}>
              {/* Not available */}
              <ConnectMediaComponent image={__logo__fb} />
              <ConnectMediaComponent image={__logo__gg} />
            </View>
          </View>
          <View style={welcomeStyles.__sign}>
            <SignComponent
              sign={"SIGN IN"}
              form={form}
              setForm={(e: number) => setForm(e)}
            />
            <SignComponent
              sign={"SIGN UP"}
              form={form}
              setForm={(e: number) => setForm(e)}
            />
          </View>
        </>
      ) : form === signform.in ? (
        <>
          <LoginScreen
            form={form}
            // setAuth={(e: any) => {
            //   setAuth(e);
            // }}
            setForm={(e: number) => setForm(e)}
            after={false}
          />
        </>
      ) : form === signform.ins ? (
        <LoginScreen
          // setAuth={(e: any) => {
          //   setAuth(e);
          // }}
          form={form}
          setForm={(e: number) => setForm(e)}
          after={true}
        />
      ) : (
        <RegisterScreen form={form} setForm={(e: number) => setForm(e)} />
      )}
    </View>
  );
}
