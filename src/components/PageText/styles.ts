import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    fontFamily: 'CeraProMedium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    paddingLeft: 21,
    paddingRight: 20,
    marginBottom: 40,
    color: theme.colorSecondary,
  },
});

export default styles as typeof styles;