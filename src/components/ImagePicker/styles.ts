import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  buttonImage: {
    width: 130,
    height: 40,
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImageIcon: {
    marginTop: -2,
    marginRight: 5,
  },
  buttonImageText: {
    color: theme.colorSecondary,
    lineHeight: 15,
  },
});

export default styles as typeof styles;