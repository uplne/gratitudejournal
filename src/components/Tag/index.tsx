import { Text, View } from 'react-native';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
};

export const Tag = ({
  children,
}: ComponentProps) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  );
};
