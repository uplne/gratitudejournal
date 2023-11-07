import { StyleSheet } from 'react-native';

import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    width: 130,
    paddingTop: 10,
    paddingBottom: 6,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: theme.colorSecondary,
  },
  buttonText: {
    fontFamily: 'GabaritoBold',
    fontSize: 18,
    lineHeight: 17,
    color: theme.white,
  },
  buttonInverse: {
    backgroundColor: 'white',
  },
  buttonTextInverse: {
    color: 'black',
  },
  buttonSimple: {
    backgroundColor: 'transparent',
    width: 'auto',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    paddingHorizontal: 5,
  },
  buttonTextSimple: {
    color: theme.colorSecondary,
    lineHeight: 24,
    padding: 0,
    margin: 0,
  }
});

export default styles as typeof styles;