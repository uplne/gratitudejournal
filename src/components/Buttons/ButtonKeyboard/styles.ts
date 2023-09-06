import { StyleSheet } from 'react-native';

import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorPrimary,
    borderRadius: 100,
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 1,
  },
});

export default styles as typeof styles;