import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import { useAppStateStore } from '../../state/AppState';
import { useRemidersStore } from '../../state/RemindersState';
import { StackNavigation } from '../../types/navigation-types';

export const AppStart = () => {
  const navigation = useNavigation<StackNavigation>();
  const appState = useAppStateStore((state) => state.appState);
  const updateAppState = useAppStateStore((state) => state.updateAppState);
  const { createReminder, reminders } = useRemidersStore((state) => state);
  let userID = appState.userID;
  let userHash = appState.userHash;
  let tracking = appState.tracking;

  const goNext = () => {
    if (appState && !appState.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    const getNotifications = async () => {
      // Setup reminder
      if (reminders.length === 0) {
        createReminder(19, 30);
      }
    };

    getNotifications();

    (async () => {
      if (Platform.OS === 'ios') {
        const { status } = await requestTrackingPermissionsAsync();

        if (status !== 'granted') {
          tracking = false;
        }
      }
    })();

    if (!userID) {
      userID = uuid.v4();
    }

    if (!userHash) {
      userHash = uuid.v4();
    }

    updateAppState({
      alreadyLaunched: true,
      userID,
      userHash,
      tracking,
    });

    goNext();
  }, []);

  return null;
};
