import { useNavigation } from '@react-navigation/native';
import { Share, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import Constants from "expo-constants";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { SubMenu } from '../../components/SubMenu';
import { StackNavigation } from '../../types/navigation-types';

import styles from './styles';

export const MyAccount = () => {
  const navigation = useNavigation<StackNavigation>();
  const version = Constants?.expoConfig?.version || '1.0.0';

  const shareApp = async () => {
    try {
      await Share.share({
        message: 'Hey! Try Gratitude Journal.',
        url: 'https://www.dailyuplift.app',
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <ContainerWithHeader
      title="My Account"
      style={styles.container}
      modal
    >
      <View style={styles.submenu}>
        <SubMenu>
          <SubMenu.MenuTitle title="App Preferences" />
          <SubMenu.MenuButton
            icon="bell-outline"
            content="Reminders"
            onPress={() => navigation.navigate('Reminders')}
          />
          <SubMenu.MenuButton
            icon="database-eye-outline"
            content="Tracking"
            onPress={() => navigation.navigate('Tracking')}
          />
          <SubMenu.MenuButton
            icon="shield-lock-outline"
            content="Touch/Face ID Lock"
            onPress={() => navigation.navigate('Biometrics')}
          />
          <SubMenu.MenuButton
            icon="file-export-outline"
            content="Export Data"
            onPress={() => navigation.navigate('ExportData')}
          />
        </SubMenu>
        <SubMenu>
          <SubMenu.MenuTitle title="Support" />
          <SubMenu.MenuButton
            icon="star-outline"
            content="Rate us"
            onPress={() => {}}
          />
          <SubMenu.MenuButton
            icon="comment-quote-outline"
            content="Invite Friends"
            onPress={shareApp}
          />
          {/* <SubMenu.MenuButton
            icon="email-outline"
            content="Contact Us"
            onPress={() => {}}
          /> */}
          <SubMenu.MenuButton
            icon="help-circle-outline"
            content="Help Centre"
            onPress={() => {}}
          />
        </SubMenu>
        <SubMenu>
          <SubMenu.MenuTitle title="Legal" />
          <SubMenu.MenuButton
            icon="file-outline"
            content="Terms of Service"
            onPress={() => Linking.openURL('https://planmylifeapps.notion.site/Terms-Conditions-Gratitude-Journal-e382318bfbe64f74ae58915269acd726?pvs=4')}
          />
          <SubMenu.MenuButton
            icon="shield-outline"
            content="Privacy Policy"
            onPress={() => Linking.openURL('https://planmylifeapps.notion.site/Privacy-Policy-Gratitude-Journal-785b5202a2cd4f0697b36e5e10da6f23?pvs=4')}
          />
        </SubMenu>
      </View>
      <View style={styles.blockVersion}>
        <Text>{`v${version}`}</Text>
      </View>
    </ContainerWithHeader>
  );
};
