import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from "expo-notifications";

import { useAppStateStore } from '../../state/AppStartState';
import { useRemidersStore } from '../../state/RemindersState';
import { StackNavigation } from '../../types/navigation-types';

export const AppStart = () => {
  const navigation = useNavigation<StackNavigation>();
  const appState = useAppStateStore((state) => state.appState);
  const updateAppStart = useAppStateStore((state) => state.updateAppStart);
  const createReminder = useRemidersStore((state) => state.createReminder);

  console.log(appState);

  useEffect(() => {
    const getNotifications = async () => {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();

      // Setup reminder
      if (notifications.length === 0) {
        createReminder(7, 30);
      }
    }

    getNotifications();

    updateAppStart({
      alreadyLaunched: true,
    });

    // Notifications.cancelAllScheduledNotificationsAsync();

    if (appState && !appState.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  }, []);

  return null;
};
