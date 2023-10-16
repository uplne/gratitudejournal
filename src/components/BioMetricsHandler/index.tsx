import { useCallback, useEffect, useRef, useState } from 'react';
import {AppState as ReactAppState} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

import { useAppStateStore } from '../../state/AppState';
import { StackNavigation } from '../../types/navigation-types';

export const BioMetricsHandler = () => {
  const navigation = useNavigation<StackNavigation>();
  const updateAppState = useAppStateStore((state) => state.updateAppState);
  const appState = useAppStateStore((state) => state.appState);
  const RefAppState = useRef(ReactAppState.currentState);
  const [appInForeground, setAppInForeground] = useState(RefAppState.current);

  const handleBiometricAuth = async () => {
    if (appState && appState.biometrics) {
      updateAppState({
        loggedIn: false,
      });
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
      });

      if (biometricAuth && biometricAuth.success) {
        updateAppState({
          loggedIn: true,
        });
        await goNext();
        return;
      }
    }
  };

  const goNext = () => {
    if (appState && !appState.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  };

  const changeHandler = useCallback((nextAppState: any) => {
    if (RefAppState.current.match(/active/) && nextAppState === 'background') {
      console.log('app going to background');
      updateAppState({
        loggedIn: false,
      });
      navigation.navigate('LockScreen');
    }

    if (
      RefAppState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('app going to foreground');
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          { name: 'LockScreen' },
        ]
      }));
      navigation.navigate('LockScreen');
      handleBiometricAuth();
    }

    RefAppState.current = nextAppState;
    setAppInForeground(RefAppState.current);
  }, [appState, navigation])

  useEffect(() => {
    const subscription = ReactAppState.addEventListener('change', changeHandler);

    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      updateAppState({
        biometricsAvailable: compatible,
      });

      await handleBiometricAuth();

      await goNext();
    })();

    return () => {
      console.log('sub remove');
      updateAppState({
        loggedIn: false,
      });
      subscription.remove();
    };
  }, []);

  return null;
};
