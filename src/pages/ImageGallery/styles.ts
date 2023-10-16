import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    border: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
});

export default styles as typeof styles;