import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 15,
  },
  containerWithPrompt: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  emptyImage: {
    width: 300,
    height: 290,
  },
  text: {
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
  },
  icon: {
    marginTop: 0,
    marginLeft: -6,
  },
  date: {
    fontFamily: 'CeraProBold',
    fontSize: 20,
    paddingLeft: 20,
    paddingBottom: 5,
  },
  footer: {
    height: 100,
  },
  month: {
    fontFamily: 'CeraProBold',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  prompt: {
    fontFamily: 'CeraProMedium',
    fontSize: 16,
    backgroundColor: '#f7f6f3',
    padding: 10,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 60,
  },
  emptyText: {
    fontFamily: 'CeraProLight',
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(0,0,0,.6)',
    textAlign: 'center',
  },
  journalType: {
    fontFamily: 'CeraProMedium',
    fontSize: 12,
    color: '#acacaa',
    position: 'absolute',
    bottom: -10,
    right: 0,
    textTransform: 'uppercase',
  }
});

export default styles as typeof styles;