import React, { useState } from 'react';
import { View } from 'react-native';
import { loginStyles } from './styles/LoginStyle';
import WelcomeComponent from './sub-screen/WelcomeComponent';
import OptionsComponent from './sub-screen/OptionsComponent';
import { LoginConstant } from '../../constants/WelcomeScreenConstantVariable';
import LoginComponent from './sub-screen/LoginComponent';
import RegisterComponent from './sub-screen/RegisterComponent';
import MoreComponent from './sub-screen/MoreComponent';

export default function LoginScreen(
  {baseState, setAuth} : {baseState: any, setAuth: any}
) {
  const [animate, setAnimate] = useState({
    active: LoginConstant.WELCOME,
  });
  return (
    <View style={loginStyles.container}> 
        {
          animate.active === LoginConstant.WELCOME ?
            <WelcomeComponent animate={animate} /> :
            animate.active === LoginConstant.LOGIN ?
              <LoginComponent animate={animate} setAuth={
                (e: boolean) => setAuth(e)}
              /> :
              animate.active === LoginConstant.REGISTER ?
                <RegisterComponent animate={animate} /> :
                  <MoreComponent animate={animate} />
        }
        <OptionsComponent animate={animate} 
          setAnimate={(e: string) => setAnimate(prevState => ({
            ...prevState,
            active: e
          }))} />
    </View>
  );
}
