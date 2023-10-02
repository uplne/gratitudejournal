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
    paddingHorizontal: 5,
  },
  buttonTextSimple: {
    color: theme.colorSecondary,
  }
});

export default styles as typeof styles;