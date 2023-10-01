import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.white,
    marginBottom: 30,
    padding: 20,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: theme.borderRadius,
  },
  rootContrast: {
    backgroundColor: theme.primary,
  },
  text: {
    fontFamily: 'CeraProMedium',
    fontWeight: '500',
    fontSize: 20,
    paddingBottom: 10,
  },
  iconButton: {
    margin: 0,
    marginRight: -10,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daily: {
    fontFamily: 'CeraProLight',
    fontSize: 16,
    paddingBottom: 0,
    paddingRight: 10,
  },
  time: {
    fontFamily: 'CeraProLight',
    fontSize: 16,
    paddingBottom: 0,
    paddingRight: 10,
  },
  picker: {
    width: 500,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
});

export default styles as typeof styles;