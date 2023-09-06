import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    paddingLeft: 21,
    paddingRight: 20,
    paddingBottom: 30,
  },
  text: {
    fontFamily: 'SourceSans3-Black',
    fontSize: 30,
    lineHeight: 35,
    color: theme.colorSecondary,
  },
});

export default styles as typeof styles;