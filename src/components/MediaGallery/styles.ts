import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 20,
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  title: {
    fontFamily: 'CeraProBold',
    fontSize: 22,
    marginBottom: 20,
  },
  row: {
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 8,
    right: 0,
  },
  albumsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tag: {
    marginBottom: 0,
  },
  albums: {
    fontFamily: 'GabaritoSemiBold',
    marginRight: 20,
    alignContent: 'center',
  },
  imageList: {
    display: 'flex',
    flexDirection: 'column',
  },
  pressable: {
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  }
});

export default styles as typeof styles;