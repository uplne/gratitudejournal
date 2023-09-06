import { Text, View } from 'react-native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  title: string,
  style?: TextStyle,
};

export const PageHeading = ({
  title,
  style = {},
}: ComponentProps) => {
  const componentStyles = [
    styles.root,
    ...[style],
  ];

  return (
    <View style={componentStyles}>
      <Text style={styles.text}>
        {title}
      </Text>
    </View>
  );
};
