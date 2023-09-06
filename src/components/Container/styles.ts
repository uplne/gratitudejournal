import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.secondary,
    paddingLeft: 20,
    paddingRight: 20,
  }
});

export default styles as typeof styles;