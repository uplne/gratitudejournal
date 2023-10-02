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
  simple?: boolean,
};

export const ButtonNext = ({
  children,
  onPress,
  style = {},
  isLoading = false,
  isDisabled = false,
  inverse = false,
  simple = false,
}: ComponentProps) => {
  const componentStyles = [
    styles.button,
    inverse ? styles.buttonInverse : null,
    simple ? styles.buttonSimple : null,
    ...[style],
  ];
  const componentTextStyles = [
    styles.buttonText,
    inverse ? styles.buttonTextInverse : null,
    simple ? styles.buttonTextSimple : null,
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
