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
    updateShouldLock,
  } = useAppStateStore((state) => state);
  const RefAppState = useRef(ReactAppState.currentState);
  const biometricsActive = appState && appState.biometrics;
  const RefBiometricsActive = useRef(biometricsActive);
  const RefShouldLock = useRef(shouldLock);
  let subscription: NativeEventSubscription | null = null;

  const handleBiometricAuth = async () => {
    await updateShouldLock(false);

    if (RefBiometricsActive.current) {
      await updateAppState({
        loggedIn: false,
      });
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
      });

      if (biometricAuth && biometricAuth.success) {
        await updateAppState({
          loggedIn: true,
        });
      } else {
        await updateAppState({
          loggedIn: false,
        });
      }
    }
  };

  useEffect(() => { RefShouldLock.current = shouldLock; }, [shouldLock]);
  useEffect(() => { RefBiometricsActive.current = biometricsActive; }, [biometricsActive]);

  const changeHandler = useCallback((nextAppState: any) => {
    // We have FaceID popup open so app is in background/inactive but we don't want to trigger biometrics again
    if (!RefShouldLock.current) {
      return;
    }

    // If biometrics is not active stop here
    if (!RefBiometricsActive.current) {
      return;
    }

    if (RefAppState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
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
  }, []);

  const subscribeChangeHandler = () => {
    subscription = ReactAppState.addEventListener('change', changeHandler);
  };

  const unSubscribeChangeHandler = () => {
    if (subscription !== null) {
      subscription.remove();
    }
  };

  useEffect(() => {
    if (biometricsActive) {
      subscribeChangeHandler();
    }

    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      updateAppState({
        biometricsAvailable: compatible,
      });

      await handleBiometricAuth();
    })();

    return () => {
      unSubscribeChangeHandler();
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
    if (appState && 'biometrics'in appState) {
      if (appState.biometrics && !subscription) {
        subscribeChangeHandler();
      }
    }
  }, [appState.biometrics]);

  useEffect(() => {
    if (!biometricsActive) {
      return goNext();
    }

    if (appState && appState.loggedIn) {
      updateShouldLock(true);
      goNext();
    } else {
      navigation.navigate('LockScreen');
    }
  }, [appState.loggedIn]);

  return <></>;
};