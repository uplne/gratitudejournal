import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    backgroundColor: 'white',
  },
  blockVersion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: theme.secondary,
  },
  submenu: {
    margin: 0,
    padding: 0,
  }
});

export default styles as typeof styles;