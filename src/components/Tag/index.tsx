import { Text, View } from 'react-native';

import styles from './styles';

type ComponentProps = {
  selected?: boolean,
  simple?: boolean,
  children: React.ReactNode,
};

export const Tag = ({
  selected = false,
  simple = false,
  children,
}: ComponentProps) => {
  const componentStyles = [
    styles.root,
    selected ? styles.selected : undefined,
    simple ? styles.simple : undefined,
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
