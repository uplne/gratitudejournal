import { Pressable, View } from "native-base";
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

type ComponentProps = {
  onPress: () => void,
  style?: TextStyle,
};

export const ButtonKeyboard = ({
  onPress,
  style = {},
}: ComponentProps) => {
  const componentStyles = [
    styles.button,
    ...[style],
  ];

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={componentStyles}
        onPress={onPress}
      >
        <MaterialIcons name="keyboard-hide" size={24} color="black" />
      </Pressable>
    </View>
  );
};
