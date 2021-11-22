import axios from "axios";
import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import __logo from "../../assets/images/atm_logo_mini.png";
import InputComponent from "../../components/InputComponent";
import { signform, svurl } from "../../constants/Constant";
import { loginStyles } from "./styles/LoginStyle";

import { Context as AuthContext } from "../../context/AuthContext";

export default function LoginScreen({
  form,
  setForm,
  after,
  // setAuth,
}: {
  form: any;
  setForm: Function;
  after: boolean;
  // setAuth: Function;
}) {
  const { state, signIn } = useContext(AuthContext);
  
  const rotate = { back: false };
  const [signin, setSignIn] = useState({
    username: "",
    password: "",
  });
  // const [edited, setEdited] = useState(false);
  const [display, setDisplay] = useState({
    edited: false,
    onEdit: false,
  });
  // const [resError, setResError] = useState({ effect: false, status: "" });

  // const login = async () => {
  //   await axios
  //     .post(svurl + "login", signin)
  //     .then((res) => {
  //       if (!res.data.effect) {
  //         setResError({ effect: true, status: res.data.status });
  //       } else {
  //         setAuth(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <View style={loginStyles.container}>
      {
        <View style={loginStyles.turnback}>
          <TouchableOpacity
            onPress={() => setForm(signform.none)}
            style={loginStyles.turnback__btn}
          >
            <Animatable.Image
              source={__logo}
              style={loginStyles.__logo}
              animation={{
                from: {
                  transform: [{ rotate: rotate.back ? "0deg" : "360deg" }],
                },
                to: {
                  transform: [{ rotate: rotate.back ? "360deg" : "deg0" }],
                },
              }}
            />
          </TouchableOpacity>
        </View>
      }
      <View style={loginStyles.signin}>
        <View>
          <InputComponent
            type={"Username"}
            state={signin.username}
            setState={(e: string) =>
              setSignIn((prevstate) => ({ ...prevstate, username: e }))
            }
            setDisplay={(e: any) => {
              setDisplay(e);
            }}
          />
          <InputComponent
            type={"Password"}
            state={signin.password}
            setState={(e: string) =>
              setSignIn((prevstate) => ({ ...prevstate, password: e }))
            }
            setDisplay={(e: any) => {
              setDisplay(e);
            }}
          />
        </View>
        <View style={loginStyles.signin__btn__view}>
          <TouchableOpacity
            style={loginStyles.signin__btn}
            onPress={() => signIn(signin)}
          >
            <Text style={loginStyles.signin__btn__text}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={loginStyles.none}>
        <View>
          {after ? (
            <Text style={loginStyles.none__check}>
              Create account successfully. You can login now.
            </Text>
          ) : (signin.username.length < 6 || signin.username.length > 20) &&
            display.edited === true ? (
            <Text style={loginStyles.none__check}>Notvalid input username</Text>
          ) : state.errorMessage.effect === true ? (
            <Text style={loginStyles.none__check}>{state.errorMessage.status}</Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
}
