import { StyleSheet, Platform } from 'react-native';

import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  textHeading: {
    fontFamily: 'GabaritoBold',
    fontSize: 26,
    lineHeight: 30,
    marginBottom: 15,
    position: 'relative',
    zIndex: 1,
    width: '65%',
  },
  textSubheading: {
    fontFamily: 'GabaritoBold',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(0,0,0,.5)',
    width: '60%',
  },
  header: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 20,
    position: 'relative',
  },
  contentContainer: {
    width: '100%',
    height: '50%',
    paddingBottom: 0,
    marginBottom: 0,
    position: 'relative',
    zIndex: -1,
  },
  headImage: {
    position: 'absolute',
    bottom: -40,
    right: 10,
    width: 200,
    height: 300,
    zIndex: 1,
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
  textArea: {
    fontFamily: 'GabaritoMedium',
    fontSize: 18,
    lineHeight: 24,
    marginTop: Platform.OS === 'ios' ? -7 : 0,
    color: theme.colorSecondary,
    selectionColor: theme.colorSecondary,
    backgroundColor: 'transparenthgfhdfh',
    width: '90%',
    textAlignVertical: 'top',
  },
  inputWrapper: {
    flex: 1,
  },
  buttonImage: {
    width: 130,
    height: 40,
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImageIcon: {
    marginTop: -2,
    marginRight: 5,
  },
  buttonImageText: {
    color: theme.colorSecondary,
    lineHeight: 15,
  },
});

export default styles as typeof styles;