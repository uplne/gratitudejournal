import { Text, View } from 'react-native';
import { Pressable } from "native-base";
import { IconButton } from 'react-native-paper';

import theme from '../../styles/theme';

import styles from './styles';

type ComponentPropTypes = {
  children: React.ReactNode,
};

export const SubMenu = ({ children }: ComponentPropTypes) => {
  return (
    <View style={styles.root}>
      {children}
    </View>
  );
};

type TitlePropTypes = {
  title: string,
};

const Title = ({ title }: TitlePropTypes) => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

SubMenu.Title = Title;

type MenuButtonPropTypes = {
  content: string,
  onPress: () => void,
  icon: string,
};

const MenuButton = ({
  content,
  onPress,
  icon,
}: MenuButtonPropTypes) => {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        <IconButton
          icon={icon}
          size={20}
          iconColor="red"
          disabled
        />
        <Text style={styles.buttonText}>{content}</Text>
      </Pressable>
      <IconButton
        icon="chevron-right"
        size={18}
        style={styles.iconArrow}
        disabled
      />
    </View>
  );
};

SubMenu.MenuButton = MenuButton;

type MenuTitlePropTypes = {
  title: string,
};

const MenuTitle = ({
  title,
}: MenuTitlePropTypes) => {
  return (
    <View style={styles.buttonWrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

SubMenu.MenuTitle = MenuTitle;
