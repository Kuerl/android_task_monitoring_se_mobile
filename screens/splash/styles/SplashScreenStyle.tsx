import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const splashScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logoView: {
    backgroundColor: 'white',
    width: windowWidth/1.4,
    height: windowWidth/1.4,
    borderRadius: 150,
    // opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: windowWidth/1.5,
    height: windowWidth/1.5,
    borderRadius: 150,
  }
});