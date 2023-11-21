import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'GabaritoSemiBold',
    marginBottom: 10,
  },
  button: {
    width: 120,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tag: {
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 15,
  },
  tagsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  }
});

export default styles as typeof styles;