import { StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '../../../constants/Constant';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 55,
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight,
  },
  __logo: {
    width: 90,
    height: 90,
  },

  turnback: {
    flex: 1,
    alignContent: 'flex-start',
    width: windowWidth,
    paddingLeft: 20,
  },
  turnback__btn:{
    height: 90,
    width: 90,
  },
  signin: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  none: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  none__check: {
    fontFamily: 'GloryM',
    color: '#F31111',
  },

  signin__btn__view: {
    width: 150,
  },
  signin__btn: {
    height: 55,
    borderRadius: 5,
    backgroundColor: '#141E30',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    marginTop: 17,
  },
  signin__btn__text: {
    color: 'white',
    fontFamily: 'GloryM',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'center',
  }
});