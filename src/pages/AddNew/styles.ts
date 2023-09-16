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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.borderRadius,
    position: 'relative',
  },
  boxTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeadline: {
    fontFamily: 'CeraProBold',
    fontSize: 16,
    paddingBottom: 10,
  },
  text: {
    fontFamily: 'CeraProLight',
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 10,
  },
  pressableImage: {
    width: 120,
    height: 120,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default styles as typeof styles;