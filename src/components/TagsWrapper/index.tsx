import { View } from 'react-native';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
};

export const TagsWrapper = ({
  children,
}: ComponentProps) => {
  return (
    <View style={styles.root}>
      {children}
    </View>
  );
};
