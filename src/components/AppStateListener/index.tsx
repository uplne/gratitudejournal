import { useEffect, useCallback, useRef } from "react";
import {
  NativeEventSubscription,
  AppState as ReactAppState,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

import { useAppStateStore } from '../../state/AppState';
import { StackNavigation } from '../../types/navigation-types';

export const AppStateListener = () => {
  const navigation = useNavigation<StackNavigation>();
  const {
    updateAppState,
    appState,
    shouldLock,
  } = useAppStateStore((state) => state);
  const RefShouldLock = useRef(shouldLock);
  const RefAppState = useRef(ReactAppState.currentState);
  const biometricsActive = appState && appState.biometrics;
  const RefBiometricsActive = useRef(biometricsActive);

  const handleBiometricAuth = async () => {
    if (biometricsActive) {
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
      } else {
        updateAppState({
          loggedIn: false,
        });
      }
    }
  };

  useEffect(() => { RefShouldLock.current = shouldLock; }, [shouldLock]);
  useEffect(() => { RefBiometricsActive.current = biometricsActive; }, [biometricsActive]);

  const changeHandler = useCallback((nextAppState: any) => {
    // To prevent locking the screen for events like image picker which sends app to background
    if (!RefShouldLock.current) {
      return;
    }

    // If biometrics is not active stop here
    if (!RefBiometricsActive.current) {
      return;
    }

    if (RefAppState.current.match(/active/) && nextAppState === 'background') {
      console.log('app is in going to background');
      updateAppState({
        loggedIn: false,
      });
      navigation.navigate('LockScreen');
    }

    if (
      RefAppState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('app is in going to foreground');
      navigation.navigate('LockScreen');
      handleBiometricAuth();
    }

    RefAppState.current = nextAppState;
  }, [])

  useEffect(() => {
    let subscription: NativeEventSubscription | null = null;

    if (biometricsActive) {
      subscription = ReactAppState.addEventListener('change', changeHandler);
    }

    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      updateAppState({
        biometricsAvailable: compatible,
      });

      await handleBiometricAuth();
    })();

    return () => {
      if (subscription !== null) {
        subscription.remove();
      }
    };
  }, []);

  const goNext = () => {
    if (appState && !appState.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    if (!RefShouldLock.current) {
      return;
    }

    if (!biometricsActive) {
      return goNext();
    }

    if (appState && appState.loggedIn) {
      goNext();
    } else {
      navigation.navigate('LockScreen');
    }
  }, [appState, RefShouldLock]);

  return null;
};