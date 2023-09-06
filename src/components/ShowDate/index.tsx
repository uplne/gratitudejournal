import { View, Text } from 'react-native';
import moment from 'moment';

import styles from './styles';

type Props = {
  date: string,
};

export const ShowDate = ({
  date,
}: Props) => {
  const generateDate = () => {
    if (moment(date).isSame(new Date(), 'day')) {
      return 'Today';
    }

    if (moment(new Date()).subtract(1, 'days').isSame(moment(date), 'day')) {
      return 'Yesterday';
    }

    return moment(date).format('Do MMMM YYYY');
  }

  return (
    <View>
      <Text style={styles.date}>{generateDate()}</Text>
    </View>
  );
};
