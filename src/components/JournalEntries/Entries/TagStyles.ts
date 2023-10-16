import { MixedStyleDeclaration } from 'react-native-render-html';

import theme from "../../../styles/theme";

const styles:Record<string, MixedStyleDeclaration> = {
  div: {
    fontFamily: 'GabaritoRegular',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 22,
  },
  b: {
    fontFamily: 'GabaritoBold',
    fontWeight: '500',
  },
  i: {
    fontSize: 26,
  },
  span: {
    fontFamily: 'GabaritoRegular',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  h1: {
    fontFamily: 'GabaritoBold',
    fontWeight: '500',
    fontSize: 26,
    lineHeight: 26,
    marginVertical: 10,
    marginBottom: 20,
  },
  h2: {
    fontFamily: 'GabaritoBold',
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 24,
    marginVertical: 10,
    marginBottom: 20,
  },
  ul: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  ol: {
    marginVertical: 10,
    paddingLeft: 20,
    lineHeight: 19,
  },
  li: {
    margin: 0,
    padding: 0,
    lineHeight: 21,
  },
  blockquote: {
    width: '100%',
    marginVertical: 10,
    marginHorizontal: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    lineHeight: 24,
  },
  a: {
    color: theme.colorPrimary,
  }
}

export default styles as typeof styles;
