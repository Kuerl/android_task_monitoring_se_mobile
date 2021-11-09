import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const loginComponentStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    width: windowWidth*4/5,
  },
  login__: {
    color: 'white',
    // fontFamily: 'SansationRegular',
    fontSize: 45,
    textShadowColor: 'rgba(225, 225, 225, 0.75)',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 10,
    marginBottom: 50,
  },
  login__form__input: {
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
    marginRight: 30,
    fontSize: 20,
  },
  login__form__input__: {
    fontSize: 18,
    padding: 10,
    // fontFamily: 'SansationRegular',
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    color: 'black',
    marginLeft: 10,
  },
  login__form__submit: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  login__warning: {
    paddingRight: 20,
  },
  login__warning__text: {
    textAlign: 'right',
    color: 'red',
    fontWeight: '700',
  },
});

export const moreComponent = StyleSheet.create({
  login__form__input: {
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
    fontSize: 20,
  },
  more__text: {
    color: '#666',
    fontSize: 20,
  }
});