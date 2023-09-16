import { View, Text } from 'react-native';

import { JournalTypes, JOURNAL_TYPES } from '../../../../state/JournalState';

import styles from '../../styles';

type Props = {
  data: JournalTypes,
};

export const Default = ({
  data,
}: Props) => {
  const containerStyles = data.type === JOURNAL_TYPES.PROMPT ? styles.containerWithPrompt : styles.container;

  return (
    <View key={String(data.data)} style={containerStyles}>
      {data.type === JOURNAL_TYPES.PROMPT && <Text style={styles.prompt}>{data.prompt}</Text>}
      <Text style={styles.text}>{data.data}</Text>
    </View> 
  );
};
