import { View, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { PageHeading } from '../PageHeading';
import { PageText } from '../PageText';
import { StackNavigation } from '../../types/navigation-types';
import { ButtonDelete } from '../Buttons/ButtonDelete';
import { ButtonNext } from '../Buttons/ButtonNext';

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
  allowSave?: () => void | undefined,
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
  }

  return (
    <View style={componentStyles}>
      <View style={styles.titleWrapper}>
        <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
        <Appbar.Header style={styles.appBar}>
          {renderBackAction()}
          {allowDelete &&
            <ButtonDelete
              style={styles.buttonDelete}
              onPress={allowDelete}
            >
              Delete
            </ButtonDelete>
          }
          {allowSave &&
            <ButtonNext
              onPress={allowSave}
            >
              Save
            </ButtonNext>
          }
          {showHome && <Appbar.Action icon="home-account" onPress={goHome} />}
        </Appbar.Header>
        {title && <PageHeading style={pageHeadingStyle} title={title} />}
        {pageText && <PageText>{pageText}</PageText>}
      </View>
      {children}
    </View>
  );
};
