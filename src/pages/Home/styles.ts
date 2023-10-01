import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

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
});

export default styles as typeof styles;