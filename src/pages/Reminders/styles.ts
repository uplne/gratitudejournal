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
  }
});

export default styles as typeof styles;