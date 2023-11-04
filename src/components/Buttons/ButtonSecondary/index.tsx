import { Text } from 'react-native';
import { Pressable } from "native-base";
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  onPress: () => void,
  isDisabled?: boolean,
  style?: TextStyle,
};

export const ButtonSecondary = ({
  children,
  onPress,
  style = {},
  isDisabled = false,
}: ComponentProps) => {
  const componentStyles = [
    styles.button,
    ...[style],
  ];
  const componentTextStyles = [
    styles.buttonText,
  ];

  return (
    <Pressable
      disabled={isDisabled}
      style={componentStyles}
      onPress={onPress}
    >
      <Text style={componentTextStyles}>{children}</Text>
    </Pressable>
  );
};
