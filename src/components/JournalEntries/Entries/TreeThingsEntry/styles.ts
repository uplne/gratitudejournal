import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerWithPrompt: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 10,
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
});

export default styles as typeof styles;