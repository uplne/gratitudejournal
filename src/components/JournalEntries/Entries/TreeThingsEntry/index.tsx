import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { JournalTypes, JOURNAL_TYPES } from '../../../../state/JournalState';

import styles from './styles';

type Props = {
  data: JournalTypes,
};

export const TreeThingsEntry = ({
  data,
}: Props) => {
  if (typeof data.data !== 'string') {
    return (
      <View>
        {data?.data?.map((item, index) => {
          let marginTopStyle = 15;

          if (item === '' || item === undefined) {
            return null;
          }

          if (index === 0) {
            marginTopStyle = 0;
          }

          return (
          <View key={item} style={[styles.container, { marginTop: marginTopStyle }]}>
            <Entypo style={styles.icon} name="dot-single" size={24} color="black" />
            <Text style={styles.text}>{item}</Text>
          </View> 
          );
        })}
      </View>
    );
  }

  const containerStyles = data.type === JOURNAL_TYPES.RANDOM ? styles.containerWithPrompt : styles.container

  return (
    <View key={data.data} style={containerStyles}>
      {data.type === JOURNAL_TYPES.RANDOM && <Text style={styles.prompt}>{data.prompt}</Text>}
      <Text style={styles.text}>{data.data}</Text>
    </View> 
  );
};
