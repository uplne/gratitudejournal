import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 30,
  },
  secondary: {
    backgroundColor: theme.secondary,
  }
});

export default styles as typeof styles;