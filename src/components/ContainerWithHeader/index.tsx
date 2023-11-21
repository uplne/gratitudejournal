import { View, Text, StatusBar, Platform, Pressable } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { PageHeading } from '../PageHeading';
import { PageText } from '../PageText';
import { StackNavigation } from '../../types/navigation-types';

import styles from './styles';

type ComponentProps = {
  title?: string | undefined,
  pageText?: string | undefined,
  children: React.ReactNode,
  modal?: boolean,
  showHome?: boolean,
  style?: TextStyle,
  pageHeadingStyle?: TextStyle,
  allowDelete?: () => void | undefined,
  allowSave?: () => void | Promise<void> | undefined,
};

export const ContainerWithHeader = ({
  title = undefined,
  pageText = undefined,
  children,
  modal = false,
  showHome = false,
  style = {},
  pageHeadingStyle = {},
  allowDelete = undefined,
  allowSave = undefined,
}: ComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const componentStyles = [
    styles.root,
    ...[style],
  ];

  const goHome = () => navigation.navigate('Home');

  const renderBackAction = () => {
    if (modal) {
      return <Appbar.Action icon="close" onPress={() => navigation.goBack()} />;
    }

    return <Appbar.BackAction onPress={() => navigation.goBack()} />;
  };

  const StatusBarHeight = Platform.OS === 'ios' && modal ? 0 : undefined;

  return (
    <View style={componentStyles}>
      <View style={styles.titleWrapper}>
        <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
        <Appbar.Header style={styles.appBar} statusBarHeight={StatusBarHeight}>
          {renderBackAction()}
          <View style={styles.buttons}>
            {allowDelete &&
              <Pressable
                style={styles.buttonDelete}
                onPress={allowDelete}
              >
                <Text>Delete</Text>
              </Pressable>
            }
            {allowSave &&
              <Pressable
                style={styles.buttonSave}
                onPress={allowSave}
              >
                <Text>Save</Text>
              </Pressable>
            }
          </View>
          {showHome && <Appbar.Action icon="home-account" onPress={goHome} />}
        </Appbar.Header>
        {title && <PageHeading style={pageHeadingStyle} title={title} />}
        {pageText && <PageText>{pageText}</PageText>}
      </View>
      {children}
    </View>
  );
};
