import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { useAppStateStore } from '../../state/AppState';
import { useRemidersStore } from '../../state/RemindersState';
import { StackNavigation } from '../../types/navigation-types';

export const AppStart = () => {
  const navigation = useNavigation<StackNavigation>();
  const appState = useAppStateStore((state) => state.appState);
  const updateAppState = useAppStateStore((state) => state.updateAppState);
  const { createReminder, reminders } = useRemidersStore((state) => state);
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
      console.log('AppStart: Notifications: ', reminders);
      // Setup reminder
      if (reminders.length === 0) {
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
