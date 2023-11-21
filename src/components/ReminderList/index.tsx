import { useEffect } from 'react';
import { View } from 'react-native';

import { useRemidersStore } from '../../state/RemindersState';
import { Reminder } from '../Reminder';

import styles from './styles';

type ComponentPropsTypes = {
  contrast?: boolean,
};

export const RemindersList = ({
  contrast = false,
}:ComponentPropsTypes) => {
  const { reminders, getData } = useRemidersStore((state) => state);

  console.log(reminders);

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.root}>
      {reminders.map((item) => {
        return (
          <Reminder
            key={String(item.id)}
            id={item.id}
            notifId={item.notifId}
            title={item.title}
            hour={item.hour}
            minute={item.minute}
            active={item.active}
            contrast={contrast}
          />
        )
      })}
    </View>
  );
};
