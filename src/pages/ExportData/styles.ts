import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  root: {
    margin: 0,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 30,
  },
  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles as typeof styles;