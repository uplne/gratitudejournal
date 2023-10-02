import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  date: {
    fontFamily: 'GabaritoSemiBold',
    fontSize: 25,
    lineHeight: 30,
  },
  dateSmall: {
    fontSize: 20,
    paddingLeft: 20,
    paddingBottom: 5,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 100,
    padding: 0,
    margin: 0,
  }
});

export default styles as typeof styles;