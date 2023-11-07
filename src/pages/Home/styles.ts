import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  addNewButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  myAccountButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
  },
  root: {
    flex: 1,
    marginTop: 50,
  },
  stagger: {
    position: 'absolute',
    bottom: 140,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    opacity: 0,
    height: 0,
  },
});

export default styles as typeof styles;