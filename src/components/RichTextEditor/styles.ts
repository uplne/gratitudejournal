import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 450,
    backgroundColor: '#ffffff',
    borderRadius: theme.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  richEditor: {
    width: '100%',
    height: 450,
  },
});

export default styles as typeof styles;