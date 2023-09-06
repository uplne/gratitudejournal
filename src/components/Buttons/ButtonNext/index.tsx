import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  onPress: () => void,
  isLoading?: boolean,
  isDisabled?: boolean,
  style?: TextStyle,
  inverse?: boolean,
};

export const ButtonNext = ({
  children,
  onPress,
  style = {},
  isLoading = false,
  isDisabled = false,
  inverse = false,
}: ComponentProps) => {
  const componentStyles = [
    styles.button,
    inverse ? styles.buttonInverse : null,
    ...[style],
  ];
  const componentTextStyles = [
    styles.buttonText,
    inverse ? styles.buttonTextInverse : null,
  ];

  return (
    <Button
      disabled={isDisabled}
      contentStyle={componentStyles}
      onPress={onPress}
      loading={isLoading}
    >
      <Text style={componentTextStyles}>{children}</Text>
    </Button>
  );
};
