import { useState, useEffect, useRef } from 'react';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as Notifications from "expo-notifications";
import { Platform } from 'expo-modules-core';
import * as Device from 'expo-device';
import { useNavigation } from '@react-navigation/native';

import { StackNavigation } from '../../types/navigation-types';
import { idType } from '../../types/idtype';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('RESPONSE LISTENER: ', response);
        navigation.navigate('AddNew');
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    null
  );
};

export const schedulePushNotification = async (hour:number, minute:number) => {
  const id = await Notifications.scheduleNotificationAsync({
    identifier: 'daily',
    content: {
      title: "Don't forget to reflect on the good.",
      body: "Take a moment to write in your gratitude journal and appreciate the little joys that bring happiness to your life. 🌟",
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
  console.log("notif id on scheduling",id);
  return id;
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
};

registerForPushNotificationsAsync();

export const cancelNotification = async (notifId:string) => {
  await Notifications.cancelScheduledNotificationAsync(notifId);
  console.log("notif id on canceling", notifId);
};

export type Reminder = {
  id: string,
  notifId: string | undefined,
  title: string,
  hour: number,
  minute: number,
  active: boolean,
  contrast?: boolean,
};

type ToggleReminderTypes = {
  id: string,
  notifId?:string | undefined,
};

type UpdateReminderTypes = ToggleReminderTypes & {
  hour: number,
  minute: number,
};

type RemindersStateType = {
  reminders: Reminder[],
  createReminder: (hour: number, minute: number) => Promise<void>,
  deleteReminder: (id: string) => void,
  updateReminder: ({
    id,
    notifId,
    hour,
    minute,
  }: UpdateReminderTypes) => void,
  toggleNotification: ({
    id,
    notifId,
  }: ToggleReminderTypes) => void,
  getData: () => void,
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gratitude_journal_reminders');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

const saveReminders = async (values: Reminder[]) => {
  try {
    const jsonValue = JSON.stringify(values);

    await AsyncStorage.setItem('@gratitude_journal_reminders', jsonValue);
    console.log('new reminders: ', values);
  } catch (e) {
    console.log('Saving error: ', e);
  }
};

export const useRemidersStore = create<RemindersStateType>((set, get) => ({
  reminders: [],
  createReminder: async (hour: number, minute: number) => {
    const reminders: Reminder[] = get().reminders;
    const notifId = await schedulePushNotification(hour, minute);

    const newReminder = {
      id: String(uuid.v4()),
      notifId,
      title: 'Daily Gratitude Reminder',
      hour,
      minute,
      active: true,
    };
    const newRemindersArray:Reminder[] = [...reminders, newReminder];

    await saveReminders(newRemindersArray);
    set({ reminders: newRemindersArray });
  },
  updateReminder: async ({
    id,
    notifId = undefined,
    hour = 19,
    minute = 0,
  }: UpdateReminderTypes) => {
    const reminders: Reminder[] = get().reminders;
    const reminderIsActive = reminders.find((item) => item.notifId === notifId);
    let newNotifId = notifId;

    // If is active cancel notification
    if (reminderIsActive && notifId) {
      await cancelNotification(notifId);
      newNotifId = undefined;
    } 
    
    // And schedule a new one
    newNotifId = await schedulePushNotification(hour, minute);

    const remindersToSave = reminders.map((item:Reminder) => {
      if (item.id === id) {
        return {
          ...item,
          notifId: newNotifId,
          hour,
          minute,
        };
      }

      return item;
    });
    await saveReminders(remindersToSave);
    set({ reminders: remindersToSave });
  },
  deleteReminder: async (id:idType) => {
    const reminders: Reminder[] = get().reminders;
    const remindersToSave = reminders.filter((item:Reminder) => item.id !== id);
    await saveReminders(remindersToSave);
    set({ reminders: remindersToSave });
  },
  toggleNotification: async ({
    id,
    notifId = undefined,
  }: ToggleReminderTypes) => {
    const reminders: Reminder[] = get().reminders;
    const notification = reminders.find((item) => item.id === id);
    const reminderIsActive = notification?.notifId;
    let newNotifId = notification?.notifId;

    if (notification) {
      // If is active cancel notification
      if (reminderIsActive && notifId && notification.active) {
        await cancelNotification(notifId);
        newNotifId = undefined;
      // Or schedule a new one
      } else {
        newNotifId = await schedulePushNotification(notification.hour, notification.minute);
      }

      const remindersToSave = reminders.map((item:Reminder) => {
        if (item.id === id) {
          return {
            ...item,
            notifId: newNotifId,
            active: !item.active,
          };
        }

        return item;
      });
      await saveReminders(remindersToSave);
      set({ reminders: remindersToSave });
    }
  },
  getData: async () => {
    const data = await getData();
    set({ reminders: data });
  }
}));