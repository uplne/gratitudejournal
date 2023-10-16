import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 40,
    paddingVertical: 25,
    marginBottom: 40,
    backgroundColor: '#eceae2',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'GabaritoSemiBold',
    fontSize: 13,
    lineHeight: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: theme.colorSecondary,
  },
  authorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 40,
  },
  textAuthor: {
    fontFamily: 'Gabarito',
    fontSize: 11,
    lineHeight: 15,
    color: theme.colorSecondary,
  },
  image: {
    position: 'absolute',
    bottom: 0,
    left: -15,
    width: 80,
    height: 80,
  }
});

export default styles as typeof styles;