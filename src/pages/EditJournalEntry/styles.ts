import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    backgroundColor: theme.secondary,
  },
  title: {
    fontSize: 18,
    paddingBottom: 35,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDelete: {
    backgroundColor: '#3B3A39',
  },
  textInputContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: theme.borderRadius,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 8,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textInputContainerLarge: {
    minHeight: 100,
  },
  textArea: {
    fontFamily: 'CeraProBold',
    fontSize: 18,
    lineHeight: 24,
    color: theme.colorSecondary,
    selectionColor: theme.colorSecondary,
    backgroundColor: 'transparent',
    width: '90%',
    textAlignVertical: 'top',
  },
  textAreaMultiline: {
    fontFamily: 'CeraProBold',
    fontSize: 18,
    lineHeight: 24,
    color: theme.colorSecondary,
    selectionColor: theme.colorSecondary,
    backgroundColor: 'transparent',
    width: '100%',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  viewWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  innerWrap: {
    marginBottom: 80,
  },
  headImage: {
    width: 300,
    height: 400,
    alignSelf: 'flex-end',
    marginTop: -60,
    zIndex: -1,
  },
  container: {
    backgroundColor: 'transparent',
  },
  buttonKeyboard: {
    right: 0,
  },
  prompt: {
    fontFamily: 'CeraProBold',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  }
});

export default styles as typeof styles;