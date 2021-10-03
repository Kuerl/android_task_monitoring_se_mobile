import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flex1: {
    flex: 3.7,
  },
  loginForm: {
    flex: 1,
    backgroundColor: 'rgba(25,25,25,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    borderTopColor: 'white',
    borderTopWidth: 0.5,
  },
  loginForm__name: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loginForm__name__: {
    color: 'white',
    // fontFamily: 'SansationRegular',
    fontSize: 50,
    textShadowColor: 'rgba(225, 225, 225, 0.75)',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 10
  },
  buttonView: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  viewIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
  }
});