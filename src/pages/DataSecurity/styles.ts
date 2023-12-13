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
  },
  textWrapper: {
    width: '100%',
    paddingHorizontal: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'GabaritoBold',
    fontSize: 22,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontFamily: 'GabaritoMedium',
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(0,0,0,.6)',
    textAlign: 'center',
  },
});

export default styles as typeof styles;