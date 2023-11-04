import React from 'react';
import { View, Dimensions } from 'react-native';
import moment from 'moment';
import {
  flow,
  groupBy,
} from 'lodash/fp';

import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";

import { useJournalStore, JournalTypes } from '../../state/JournalState';
import theme from '../../styles/theme';
import { ButtonNext } from '../Buttons/ButtonNext';

import styles from './styles';

type PropTypes = {
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void,
  onClick: ((value: moment.Moment) => void),
}

export const CalendarModal = ({
  modalVisible,
  setModalVisible,
  onClick,
}: PropTypes) => {
  const { journal } = useJournalStore();
  const sortedByDate = flow(groupBy((item: JournalTypes) => moment(item.date).format('YYYY-MM-DD')))(journal);

  const { width } = Dimensions.get('window');
  const modalWidth = width - 80;

  const returnCustomDatesStyles = (date: string) => {
    const currentDate = moment(date).format('YYYY-MM-DD');

    if (currentDate in sortedByDate) {
      return {
        date: moment(date).clone(),
        style: { backgroundColor: theme.colorPrimaryLight },
        textStyle: { color: 'black' }, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      };
    }

    return [];
  };

  const onChangeHandler = async (date: moment.Moment) => {
    await onClick(date);
    setModalVisible(false);
  };

  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.calendar}>
        <CalendarPicker
          startFromMonday
          todayBackgroundColor={theme.colorTernary}
          todayTextStyle={{ color: "white" }}
          selectedDayColor={theme.colorPrimary}
          onDateChange={onChangeHandler}
          width={modalWidth}
          textStyle={styles.calendarTextStyle}
          customDatesStyles={returnCustomDatesStyles}
        />
        <View style={styles.bottom}>
          <ButtonNext
            onPress={() => setModalVisible(false)}
          >
            Close
          </ButtonNext>
        </View>
      </View>
    </Modal>
  );
};
