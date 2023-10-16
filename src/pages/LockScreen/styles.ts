import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 300,
    height: 290,
    alignSelf: 'center',
  },
});

export default styles as typeof styles;