import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    marginBottom: 15,
    marginRight: 35,
  },
  deleteButton: {
    width: 40,
    height: 25,
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  buttonImageText: {
    color: theme.colorSecondary,
    lineHeight: 15,
  },
});

export default styles as typeof styles;