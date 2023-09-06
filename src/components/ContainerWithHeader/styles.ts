import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.secondary,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.secondary,
    position: 'relative',
  },
  titleWrapper: {
    alignSelf: 'stretch',
    backgroundColor: theme.secondary,
  },
  titleStyle: {
    fontFamily: 'SourceSans3-Black',
  }
});

export default styles as typeof styles;