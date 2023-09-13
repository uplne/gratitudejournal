import { StyleSheet } from 'react-native';

import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 14,
    color: theme.colorSecondary,
  },
});

export default styles as typeof styles;