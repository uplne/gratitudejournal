import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'CeraProBold',
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,.4)',
    paddingLeft: 22,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.6)',
    textTransform: 'uppercase',
  },
  buttonWrapper: {
    position: 'relative',
  },
  button: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.07)',
    position: 'relative',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.7)',
  },
  iconArrow: {
    position: 'absolute',
    right: 10,
    top: 0,
  }
});

export default styles as typeof styles;
