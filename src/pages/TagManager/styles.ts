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
    marginTop: -60,
    marginBottom: 30,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'GabaritoSemiBold',
    marginBottom: 10,
  },
  button: {
    width: 140,
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
  tag: {
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 15,
  },
  tagsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  addNewWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});

export default styles as typeof styles;