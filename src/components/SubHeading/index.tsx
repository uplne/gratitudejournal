import { Text } from 'react-native';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
};

export const SubHeading = ({
  children,
}: ComponentProps) => {
  return (
    <Text style={styles.root}>
      {children}
    </Text>
  );
};
