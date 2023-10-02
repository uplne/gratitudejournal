import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    fontFamily: 'GabaritoBold',
    color: theme.colorSecondary,
    fontSize: 22,
    paddingTop: 0,
    marginBottom: 30,
  },
});

export default styles as typeof styles;