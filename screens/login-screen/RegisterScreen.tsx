import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { loginStyles } from './styles/LoginStyle';
import * as Animatable from 'react-native-animatable';
import __logo from '../../assets/images/atm_logo_mini.png';
import { signform, svurl } from '../../constants/Constant';
import InputComponent from '../../components/InputComponent';
import __axios from '../../utils/AxiosBase';
import axios from 'axios';

export default function RegisterScreen(
  { form, setForm }: { form: any, setForm: Function}
) {
  const rotate = { back: false };
  const [signup, setSignUp] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    description: '',
  });
  const [display, setDisplay] = useState({
    edited: false,
    onEdit: false,
  });
  const [resError, setResError] = useState({ effect: false, status: '' });

  const registerReq = async () => {
    await axios.post(svurl + 'register', 
      signup
    ).then(res => {
      if (!res.data.effect) {
        setResError({ effect: true, status: res.data.status })
      }
      else {
        setForm(999);
      }
    }).catch(err => console.log(err));
  }

  return(
    <View style={loginStyles.container} >
      <View style={loginStyles.turnback} >
        <TouchableOpacity onPress={() => setForm(signform.none)} style={loginStyles.turnback__btn} >
          <Animatable.Image source={__logo} style={loginStyles.__logo} animation={{
              from: {
                transform: [{ rotate: rotate.back?'0deg': '360deg'}]
                },
                to: {
                    transform: [{ rotate: rotate.back?'360deg' : "deg0"}]
                }
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={loginStyles.signin} >
        <View>
          <InputComponent type={'Username'} state={signup.username} setState={
            (e: string) => setSignUp(prevstate => ({...prevstate, username: e}))
          } setDisplay={(e: any) => {setDisplay(e)}} />
          <InputComponent type={'Password'} state={signup.password} setState={
            (e: string) => setSignUp(prevstate => ({...prevstate, password: e}))
          } setDisplay={(e: any) => {setDisplay(e)}} />
          <InputComponent type={'First Name'} state={signup.firstName} setState={
            (e: string) => setSignUp(prevstate => ({...prevstate, firstName: e}))
          } setDisplay={(e: any) => {setDisplay(e)}} />
          <InputComponent type={'Last Name'} state={signup.lastName} setState={
            (e: string) => setSignUp(prevstate => ({...prevstate, lastName: e}))
          } setDisplay={(e: any) => {setDisplay(e)}} />
        </View>
        <View style={loginStyles.signin__btn__view}>
            <TouchableOpacity style={loginStyles.signin__btn}
              onPress={() => registerReq()}
            >
              <Text style={loginStyles.signin__btn__text}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
      </View>
      <View style={loginStyles.none} >
        {
          display.edited === false ? <></> :
          ((signup.username).length < 6 || (signup.username).length > 20) ?
            <Text style={loginStyles.none__check}>Notvalid input username</Text> : 
            ((signup.password).length < 6 || (signup.password).length > 20) ?
            <Text style={loginStyles.none__check}>Notvalid input password</Text> :
            resError.effect === true ? <Text style={loginStyles.none__check}>{resError.status}</Text> :
            <></>
        }
      </View>
    </View>
  );
}
