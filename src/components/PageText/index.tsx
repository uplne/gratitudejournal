import { Text } from 'react-native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  style?: TextStyle,
};

export const PageText = ({
  children,
  style = {},
}: ComponentProps) => {
  return (
    <Text style={[...[style], styles.root]}>{children}</Text>
  );
};
