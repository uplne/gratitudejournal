import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,.8)',
    borderRadius: 100,
    width: 40,
    height: 40,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

export default styles as typeof styles;