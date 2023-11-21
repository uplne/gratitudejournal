import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  buttonImage: {
    width: 100,
    height: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImageText: {
    color: theme.colorSecondary,
    lineHeight: 17,
  },
});

export default styles as typeof styles;