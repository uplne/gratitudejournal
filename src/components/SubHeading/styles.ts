import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    fontFamily: 'SourceSans3-Black',
    color: theme.colorSecondary,
    fontSize: 20,
    paddingTop: 0,
    marginBottom: 30,
  },
});

export default styles as typeof styles;