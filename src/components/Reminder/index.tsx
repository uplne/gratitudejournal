import { useState } from 'react';
import { Text, View } from 'react-native';
import { Pressable } from 'native-base';
import { Switch } from 'react-native-paper';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showMessage } from "react-native-flash-message";

import { Reminder as ReminderType, useRemidersStore } from '../../state/RemindersState';
import { MESSAGES } from '../../state/messages';

import styles from './styles';
import theme from '../../styles/theme';

export const Reminder = ({
  id,
  notifId,
  title,
  hour,
  minute,
  active,
  contrast = false,
}: ReminderType) => {
  const { updateReminder, toggleNotification, reminders } = useRemidersStore((state) => state);
  const currentReminder = reminders.find((item) => item.id === id);
  const [show, setShow] = useState(false);

  const onPressHandler = async () => {
    toggleNotification({id, notifId });
  };

  const onConfirm = (selectedDate: Date) => {
    updateReminder({
      id,
      notifId, 
      hour: moment(selectedDate).hour(),
      minute: moment(selectedDate).minute()
    });
    setShow(false);
    showMessage({
      message: MESSAGES.CHANGES_SAVED,
      type: 'success',
      backgroundColor: theme.colorSecondary,
    });
  };

  const selectTime = () => {
    setShow(true);
  };

  const style = contrast ? [styles.root, ...[styles.rootContrast]] : styles.root;

  return (
    <>
      <DateTimePickerModal
        isVisible={show}
        mode="time"
        display="spinner"
        is24Hour={true}
        minuteInterval={15}
        onConfirm={onConfirm}
        onCancel={() => setShow(false)}
      />
      <View key={String(id)} style={style}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.wrapper}>
          <Pressable onPress={selectTime}>
            <Text style={{fontWeight: 'bold' }}>{moment({
              hour: currentReminder?.hour,
              minute: currentReminder?.minute,
            }).format('kk:mm')}</Text>
          </Pressable>
          <Switch
            value={active}
            onValueChange={onPressHandler}
            color={theme.colorPrimary}
          />
        </View>
      </View>
    </>
  );
};
