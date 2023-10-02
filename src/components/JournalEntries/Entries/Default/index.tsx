import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';

import { JournalTypes, JOURNAL_TYPES } from '../../../../state/JournalState';

import styles from '../../styles';
import TagStyles from '../TagStyles';

type Props = {
  data: JournalTypes,
};

const systemFonts = [...defaultSystemFonts, 'Gabarito'];

export const Default = ({
  data,
}: Props) => {
  if (typeof data.data !== 'string') {
    return (
      <View style={{ marginBottom: 15 }}>
        {data?.data?.map((item, index) => {
          let marginTopStyle = 15;

          if (item === '' || item === undefined) {
            return null;
          }

          if (index === 0) {
            marginTopStyle = 0;
          }

          return (
          <View key={item} style={[styles.container, { marginTop: marginTopStyle, paddingBottom: 0 }]}>
            <Entypo style={styles.icon} name="dot-single" size={24} color="black" />
            <Text style={styles.text}>{item}</Text>
          </View> 
          );
        })}
      </View>
    );
  }

  const containerStyles = data.type === JOURNAL_TYPES.PROMPT ? styles.containerWithPrompt : styles.container;

  return (
    <View key={String(data.data)} style={containerStyles}>
      {data.type === JOURNAL_TYPES.PROMPT && <Text style={styles.prompt}>{data.prompt}</Text>}
      <RenderHtml
        contentWidth={300}
        baseStyle={styles.text}
        tagsStyles={TagStyles}
        systemFonts={systemFonts}
        source={{ html: data.data}}
      />
    </View> 
  );
};
