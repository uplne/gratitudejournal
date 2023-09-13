import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    right: -10,
    width: 200,
    height: 320,
    zIndex: -1,
  },
  pressableBox: {
    backgroundColor: theme.primary,
    marginBottom: 20,
    padding: 20,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.borderRadius,
    position: 'relative',
  },
  boxTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textHeadline: {
    fontFamily: 'CeraProBold',
    fontSize: 22,
    paddingBottom: 10,
  },
  pressableImage: {
    position: 'absolute',
    bottom: 0,
    left: -10,
    width: 120,
    height: 170,
    zIndex: 1,
  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    zIndex: 10,
  },
  container: {
    flex: 1,
    marginBottom: 0,
    paddingTop: 0,
  },
});

export default styles as typeof styles;