import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  calendar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 20,
    backgroundColor: theme.secondary,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  calendarTextStyle: {
    fontFamily: 'GabaritoMedium',
    fontSize: 16,
  }
});

export default styles as typeof styles;