import { View, ImageBackground } from 'react-native';

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { RemindersList } from '../../components/ReminderList';

import asset from '../../../assets/bgs/clock.png';

import styles from './styles';

export const Reminders = () => {
  return (
    <ContainerWithHeader
      title="Reminders"
      style={styles.root}
    >
      <View style={styles.imageWrapper}>
        <ImageBackground source={asset} style={styles.image} />
      </View>
      <RemindersList />
    </ContainerWithHeader>
  );
};
