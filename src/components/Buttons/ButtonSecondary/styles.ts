import { StyleSheet } from 'react-native';

import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    width: 200,
    paddingTop: 15,
    paddingBottom: 11,
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: theme.colorSecondary,
    borderWidth: 2,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 17,
    fontFamily: 'GabaritoSemiBold',
    color: theme.colorSecondary,
  },
});

export default styles as typeof styles;