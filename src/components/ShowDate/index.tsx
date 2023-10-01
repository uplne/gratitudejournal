import { useState } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import { IconCircleButton } from '../Buttons/IconCircleButton';
import { CalendarModal } from '../CalendarModal';
import theme from '../../styles/theme';

import styles from './styles';

type Props = {
  date: moment.Moment | string,
  setDate?: ((value: moment.Moment) => void) | null,
  small?: boolean,
};

export const ShowDate = ({
  date,
  setDate = null,
  small = false,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const generateDate = () => {
    if (moment(date).isSame(new Date(), 'day')) {
      return 'Today';
    }

    if (moment(new Date()).subtract(1, 'days').isSame(moment(date), 'day')) {
      return 'Yesterday';
    }

    return moment(date).format('Do MMM YYYY');
  };

  const dateStyles = small ? [styles.date, styles.dateSmall] : styles.date;

  return (
    <View style={styles.root}>
      <Text style={dateStyles}>{generateDate()}</Text>
      {setDate &&
        <>
          <IconCircleButton
            icon="calendar-month-outline"
            style={styles.button}
            iconColor={theme.colorSecondary}
            onPress={() => setModalVisible(true)}
            disabled={false}
          />
          <CalendarModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onClick={setDate}
          />
        </>
      }
    </View>
  );
};
