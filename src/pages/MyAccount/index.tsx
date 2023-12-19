import { useNavigation } from '@react-navigation/native';
import { Share, Text, View, Platform, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import Constants from "expo-constants";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { SubMenu } from '../../components/SubMenu';
import { StackNavigation } from '../../types/navigation-types';

import styles from './styles';

export enum STORE_URL {
  'ANDROID' = 'https://play.google.com/store/apps/details?id=com.planmylife.gratitudejournal',
};

export const MyAccount = () => {
  const navigation = useNavigation<StackNavigation>();
  const version = Constants?.expoConfig?.version || '1.0.0';

  const shareApp = async () => {
    try {
      await Share.share({
        message: `Hey! Try Gratitude Journal. App Link - ${STORE_URL.ANDROID}`, 
        url: STORE_URL.ANDROID,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const rateUs = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('itms-apps://');
    } else {
      Linking.openURL('market://details?id=com.planmylife.gratitudejournal');
    }
  };

  return (
    <ContainerWithHeader
      title="My Account"
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.submenu}>
          <SubMenu>
            <SubMenu.MenuTitle title="App Preferences" />
            <SubMenu.MenuButton
              icon="bell-outline"
              content="Reminders"
              onPress={() => navigation.navigate('Reminders')}
            />
            {/* <SubMenu.MenuButton
              icon="database-eye-outline"
              content="Tracking"
              onPress={() => navigation.navigate('Tracking')}
            /> */}
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
              onPress={rateUs}
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
            <SubMenu.MenuButton
              icon="lock-outline"
              content="Data Security"
              onPress={() => navigation.navigate('DataSecurity')}
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
      </ScrollView>
    </ContainerWithHeader>
  );
};
