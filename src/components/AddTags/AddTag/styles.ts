import { StyleSheet, Platform } from 'react-native';

import theme from '../../../styles/theme';

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
  button: {
    width: 100,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 6,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    position: 'absolute',
    top: 8,
    right: 0,
  },
  createFormWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textInputContainer: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 15,
    paddingVertical: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: theme.colorPrimary,
    borderRadius: 20,
    paddingVertical: 11,
    lineHeight: 50,
    width: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontFamily: 'GabaritoBold',
  },
  textArea: {
    fontFamily: 'GabaritoMedium',
    fontSize: 18,
    lineHeight: 21,
    paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    color: theme.colorSecondary,
    selectionColor: theme.colorSecondary,
    backgroundColor: 'transparent',
    width: '90%',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  plusIcon: {
    paddingTop: 5,
  },
  createWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
  },
  createNewTagTitle: {
    fontFamily: 'GabaritoMedium',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default styles as typeof styles;