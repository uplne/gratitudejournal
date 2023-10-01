import { Text } from 'react-native';
import { Pressable } from "native-base";
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  onPress: () => void,
  style?: TextStyle,
};

export const ButtonDelete = ({
  children,
  onPress,
  style = {},
}: ComponentProps) => {
  const componentStyles = [
    styles.button,
    ...[style],
  ];

  return (
    <Pressable
      style={componentStyles}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};
