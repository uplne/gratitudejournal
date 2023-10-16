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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonDelete: {
    alignItems: 'flex-end',
    width: 70,
    marginRight: 20,
  },
  buttonSave: {
    alignItems: 'flex-end',
    marginRight: 20,
    padding: 0,
    margin: 0,
  },
});

export default styles as typeof styles;