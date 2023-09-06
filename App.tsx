import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { AppStartContextComponent, getAppData } from './src/context/AppStartContext';
import { JournalContextComponent } from './src/context/JournalContext';

import { InitTracking } from './src/services/Tracking';

// import './src/components/ActionSheet/sheets';

import theme from './src/styles/theme';

SplashScreen.preventAutoHideAsync();
InitTracking();

export type RootStackParamList = {
  Home: undefined;
  AppStart: undefined,
  Tracking: undefined,
  AddNew: undefined,

  ThreeThings: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [appData, setAppData] = useState(null);
  const [fontsLoaded] = useFonts({
    'CeraProBold': require('./assets/fonts/cerapro/CeraProBold.otf'),
    'CeraProMedium': require('./assets/fonts/cerapro/CeraProMedium.otf'),
    'CeraProLight': require('./assets/fonts/cerapro/CeraProLight.otf'),

    'SourceSans3-Black': require('./assets/fonts/sourcesans/SourceSans3-Black.ttf'),
    'SourceSans3-Medium': require('./assets/fonts/sourcesans/SourceSans3-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const prepare = async () => {
      const data = await getAppData();
      setAppData(data);
      setAppIsReady(true);
    };

    prepare();
  }, []);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <PaperProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <AppStartContextComponent data={appData}>
              <JournalContextComponent>
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
                    initialRouteName="AppStart"
                  >
                    <Stack.Screen name="AppStart" component={AppStart} />
                    <Stack.Screen name="Home" component={Home} />

                    <Stack.Screen name="ThreeThings" component={ThreeThings} />

                    <Stack.Group screenOptions={{
                      presentation: 'modal',
                      animation: 'slide_from_bottom',
                    }}>
                      <Stack.Screen name="AddNew" component={AddNew} />
                    </Stack.Group>
                  </Stack.Navigator>
                </SheetProvider>
              </JournalContextComponent>
            </AppStartContextComponent>
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
