import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from "expo-notifications";
import uuid from 'react-native-uuid';

import { useAppStateStore } from '../../state/AppState';
import { useRemidersStore } from '../../state/RemindersState';
import { StackNavigation } from '../../types/navigation-types';

export const AppStart = () => {
  const navigation = useNavigation<StackNavigation>();
  const appState = useAppStateStore((state) => state.appState);
  const updateAppState = useAppStateStore((state) => state.updateAppState);
  const createReminder = useRemidersStore((state) => state.createReminder);
  let userID = appState.userID;

  const goNext = () => {
    if (appState && !appState.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    const getNotifications = async () => {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();

      // Setup reminder
      if (notifications.length === 0) {
        createReminder(19, 30);
      }
    };

    getNotifications();

    if (!userID) {
      userID = uuid.v4();
    }

    updateAppState({
      alreadyLaunched: true,
      userID,
    });

    goNext();
  }, []);

  return null;
};
