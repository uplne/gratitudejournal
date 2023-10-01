import theme from "../../../styles/theme";

const styles = {
  div: {
    fontWeight: 'normal',
  },
  br: {
    backgroundColor: 'blue',
  },
  b: {
    fontWeight: 'normal',
  },
  i: {
    fontSize: 26,
  },
  h1: {
    fontSize: 26,
    lineHeight: 26,
    fontWeight: 'normal',
    marginVertical: 10,
    marginBottom: 20,
  },
  h2: {
    fontSize: 24,
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
    lineHeight: 19,
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
