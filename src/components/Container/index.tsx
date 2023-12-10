import { KeyboardAvoidingView, Platform } from 'react-native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';

type ComponentProps = {
  style?: TextStyle,
  children: React.ReactNode,
};

export const Container = ({
  style = {},
  children,
}: ComponentProps) => {
  const componentStyles = [
    styles.root,
    ...[style],
  ];

  return (
    <KeyboardAvoidingView
      style={componentStyles}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
