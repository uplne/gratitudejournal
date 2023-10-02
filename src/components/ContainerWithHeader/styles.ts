import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  titleWrapper: {
    alignSelf: 'stretch',
  },
  titleStyle: {
    fontFamily: 'GabaritoSemiBold',
  },
  buttonDelete: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default styles as typeof styles;