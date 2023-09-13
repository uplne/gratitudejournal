import { View, Text } from 'react-native';

import { JournalTypes, JOURNAL_TYPES } from '../../../../state/JournalState';

import styles from '../TreeThingsEntry/styles';

type Props = {
  data: JournalTypes,
};

export const Default = ({
  data,
}: Props) => {
  const containerStyles = data.type === JOURNAL_TYPES.RANDOM ? styles.containerWithPrompt : styles.container

  return (
    <View key={data.data} style={containerStyles}>
      {data.type === JOURNAL_TYPES.RANDOM && <Text style={styles.prompt}>{data.prompt}</Text>}
      <Text style={styles.text}>{data.data}</Text>
    </View> 
  );
};
