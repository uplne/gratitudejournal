import { IconButton } from 'react-native-paper';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from './styles';
import theme from '../../../styles/theme'

type ComponentProps = {
  icon?: string,
  onPress: () => void,
  disabled?: boolean,
  style?: TextStyle,
};

export const IconCircleButton = ({
  icon = "arrow-right",
  onPress,
  disabled = true,
  style = {},
}: ComponentProps) => {
  const componentStyles = [
    styles.root,
    ...[style],
  ];

  const iconData = icon ? icon : 'arrow-right';

  return (
    <IconButton
      icon={iconData}
      iconColor={theme.white}
      containerColor={theme.colorSecondary}
      style={componentStyles}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
