import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  titleWrapper: {
    alignSelf: 'stretch',
  },
  titleStyle: {
    fontFamily: 'SourceSans3-Black',
  },
  buttonDelete: {
    position: 'absolute',
    top: 4,
    right: 10,
  },
});

export default styles as typeof styles;