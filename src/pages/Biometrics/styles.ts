import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.white,
    marginBottom: 30,
    marginHorizontal: 20,
    padding: 20,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.borderRadius,
  },
  title: {
    fontSize: 18,
    paddingBottom: 35,
  },
  text: {
    fontFamily: 'GabaritoSemiBold',
    fontSize: 16,
  },
  iconButton: {
    margin: 0,
    marginRight: -10,
  },
  picker: {
    width: 500,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
});

export default styles as typeof styles;