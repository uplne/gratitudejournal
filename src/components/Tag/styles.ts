import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    fontFamily: 'GabaritoRegular',
    color: theme.colorSecondary,
    fontSize: 16,
  },
  selected: {
    backgroundColor: theme.colorPrimary,
  },
  selectedText: {
    color: 'white',
  },
  simple: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 5,
    backgroundColor: 'transparent',
    paddingTop: 2,
    paddingBottom: 4,
  },
});

export default styles as typeof styles;