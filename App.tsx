import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, AppState } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SheetProvider } from "react-native-actions-sheet";
import FlashMessage from "react-native-flash-message";

import { Home } from './src/pages/Home';
import { AppStart } from './src/pages/AppStart';
import { AddNew } from './src/pages/AddNew';
import { ThreeThings } from './src/pages/Journals/ThreeThings';
import { Default } from './src/pages/Journals/Default';
import { OneLine } from './src/pages/Journals/OneLine';
import { Prompt } from './src/pages/Journals/Prompt';
import { MyAccount } from './src/pages/MyAccount';
import { Reminders } from './src/pages/Reminders';
import { Tracking } from './src/pages/Tracking';
import { Biometrics } from './src/pages/Biometrics';
import { LockScreen } from './src/pages/LockScreen';
import { EditJournalEntry } from './src/pages/EditJournalEntry';
import { ImageGallery } from './src/pages/ImageGallery';
import { AppStateListener } from './src/components/AppStateListener';
import { getAppData } from './src/state/AppState';
import { idType } from './src/types/idtype';
import { useAppStateStore } from './src/state/AppState';

import { InitTracking } from './src/services/Tracking';

// import './src/components/ActionSheet/sheets';

import theme from './src/styles/theme';

SplashScreen.preventAutoHideAsync();
InitTracking();

export type RootStackParamList = {
  Home: undefined;
  AppStart: undefined,
  AddNew: undefined,
  MyAccount: undefined,
  Reminders: undefined,
  Tracking: undefined,
  Biometrics: undefined,
  LockScreen: undefined,
  EditJournalEntry: { id: idType },

  ThreeThings: undefined,
  Default: undefined,
  OneLine: undefined,
  Prompt: undefined,
  ImageGallery: { id: idType },
};

console.log('APP appState: ', AppState.currentState);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { updateAppState, appState, shouldLock } = useAppStateStore((state) => state);
  const [fontsLoaded] = useFonts({
    'CeraProBold': require('./assets/fonts/cerapro/CeraProBold.otf'),
    'CeraProBoldItalic': require('./assets/fonts/cerapro/CeraProBoldItalic.otf'),
    'CeraProMedium': require('./assets/fonts/cerapro/CeraProMedium.otf'),
    'CeraProMediumItalic': require('./assets/fonts/cerapro/CeraProMediumItalic.otf'),
    'CeraProLight': require('./assets/fonts/cerapro/CeraProLight.otf'),
    'CeraProLightItalic': require('./assets/fonts/cerapro/CeraProLightItalic.otf'),

    'Gabarito': require('./assets/fonts/Gabarito-VariableFont_wght.ttf'),
    'GabaritoRegular': require('./assets/fonts/Gabarito/Gabarito-Regular.ttf'),
    'GabaritoMedium': require('./assets/fonts/Gabarito/Gabarito-Medium.ttf'),
    'GabaritoBold': require('./assets/fonts/Gabarito/Gabarito-Bold.ttf'),
    'GabaritoSemiBold': require('./assets/fonts/Gabarito/Gabarito-SemiBold.ttf'),
    'GabaritoBlack': require('./assets/fonts/Gabarito/Gabarito-Black.ttf'),
    'GabaritoExtraBold': require('./assets/fonts/Gabarito/Gabarito-ExtraBold.ttf'),
  });
  let startPage: keyof RootStackParamList = 'AppStart';

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  useEffect(() => {
    const prepare = async () => {
      const appData = await getAppData();
      await updateAppState({
        ...appData,
      });
      
      setAppIsReady(true);
    };

    prepare();
  }, []);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  // If biometrics are active landing page should be the lock screen
  // if (appState && appState.biometrics && shouldLock) {
  //   startPage = 'LockScreen';
  // }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <PaperProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <SheetProvider>
              <FlashMessage position="bottom" />
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: {
                    backgroundColor: theme.secondary,
                  }
                }}
                initialRouteName={startPage}
              >
                <Stack.Screen name="AppStart" component={AppStart} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MyAccount" component={MyAccount} />
                <Stack.Screen name="Reminders" component={Reminders} />
                <Stack.Screen name="Tracking" component={Tracking} />
                <Stack.Screen name="Biometrics" component={Biometrics} />

                {/* // Journals */}
                <Stack.Screen name="ThreeThings" component={ThreeThings} />
                <Stack.Screen name="Default" component={Default} />
                <Stack.Screen name="OneLine" component={OneLine} />
                <Stack.Screen name="Prompt" component={Prompt} />

                <Stack.Group screenOptions={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}>
                  <Stack.Screen name="AddNew" component={AddNew} />
                  <Stack.Screen name="EditJournalEntry" component={EditJournalEntry} />
                  <Stack.Screen name="ImageGallery" component={ImageGallery} />
                </Stack.Group>

                <Stack.Group screenOptions={{
                  animation: 'fade',
                }}>
                  <Stack.Screen name="LockScreen" component={LockScreen} />
                </Stack.Group>
              </Stack.Navigator>
              <AppStateListener />
            </SheetProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
