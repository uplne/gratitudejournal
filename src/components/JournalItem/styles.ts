import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.primary,
    marginBottom: 20,
    padding: 20,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: theme.borderRadius,
  },
  text: {
    fontFamily: 'CeraProMedium',
    fontSize: 18,
    lineHeight: 20,
    paddingBottom: 0,
    paddingRight: 10,
    flex: 1,
  },
  iconButton: {
    margin: 0,
    marginRight: -10,
    marginTop: -9,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  }
});

export default styles as typeof styles;