import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  onPress: () => void,
  isLoading?: boolean,
  style?: TextStyle,
};

export const ButtonDelete = ({
  children,
  onPress,
  isLoading = false,
  style = {},
}: ComponentProps) => {
  const componentStyles = [
    ...[style],
  ];

  return (
    <Button
      style={componentStyles}
      mode="text"
      contentStyle={styles.button}
      onPress={onPress}
      loading={isLoading}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Button>
  );
};
