import { View } from 'react-native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  secondary?: boolean,
  style?: TextStyle,
};

export const ContentBlock = ({
  children,
  secondary = false,
  style = {},
}: ComponentProps) => {
  const componentStyles = [
    styles.root,
    secondary ? styles.secondary : null,
    ...[style],
  ];

  return (
    <View style={componentStyles}>
      {children}
    </View>
  );
};
