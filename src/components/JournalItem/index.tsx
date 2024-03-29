import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { StackNavigation } from '../../types/navigation-types';
import { idType } from '../../types/idtype';
import { TrackingEvent } from '../../services/Tracking';

import styles from './styles';

type ComponentProps = {
  children: React.ReactNode,
  id: idType,
};

export const JournalItem = ({
  children,
  id,
}: ComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const onPress = () => {
    TrackingEvent('Journal Entry - Click', { "Name": `Edit ${id}`});
    navigation.navigate('EditJournalEntry', {
      id,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {children}
      </View>
      <IconButton
        icon='pencil-outline'
        style={styles.iconButton}
        onPress={onPress}
      />
    </View>
  );
};
