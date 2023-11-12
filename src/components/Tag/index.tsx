import { Text, View } from 'react-native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  selected?: boolean,
  simple?: boolean,
  style?: TextStyle,
  children: React.ReactNode,
};

export const Tag = ({
  selected = false,
  simple = false,
  style = {},
  children,
}: ComponentProps) => {
  const componentStyles = [
    styles.root,
    selected ? styles.selected : undefined,
    simple ? styles.simple : undefined,
    style,
  ];

  const textStyles = [
    styles.text,
    selected ? styles.selectedText : undefined,
  ];

  return (
    <View style={componentStyles}>
      <Text style={textStyles}>
        {children}
      </Text>
    </View>
  );
};
