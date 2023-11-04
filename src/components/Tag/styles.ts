import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: theme.colorPrimaryLight,
  },
  text: {
    fontFamily: 'GabaritoRegular',
    color: theme.colorSecondary,
    fontSize: 16,
  }
});

export default styles as typeof styles;