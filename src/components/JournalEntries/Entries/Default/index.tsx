import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Constants from "expo-constants";
import RenderHtml from 'react-native-render-html';

import { JournalTypes, JOURNAL_TYPES, decryptData } from '../../../../state/JournalState';
import { useAppStateStore } from '../../../../state/AppState';

import styles from '../../styles';
import TagStyles from '../TagStyles';

type Props = {
  data: JournalTypes,
};

const systemFonts = [...Constants.systemFonts, 'GabaritoRegular', 'GabaritoBold'];

export const Default = ({
  data,
}: Props) => {
  const appState = useAppStateStore.getState().appState;

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

          const singleDataDecrypted = decryptData(item, appState.userHash)?.toString();

          return (
          <View key={singleDataDecrypted} style={[styles.container, { marginTop: marginTopStyle, paddingBottom: 0, width: '85%', }]}>
            <Entypo style={styles.icon} name="dot-single" size={24} color="black" />
            <Text style={styles.text}>{singleDataDecrypted}</Text>
          </View> 
          );
        })}
      </View>
    );
  }

  const singleDataDecrypted = decryptData(data.data, appState.userHash)?.toString();

  if (data.type === JOURNAL_TYPES.ONE_LINE) {
    return (
      <View key={singleDataDecrypted} style={[styles.container, { paddingBottom: 0, marginBottom: 15, }]}>
        <Text style={styles.text}>{singleDataDecrypted}</Text>
      </View> 
    );
  }

  const containerStyles = data.type === JOURNAL_TYPES.PROMPT ? styles.containerWithPrompt : styles.container;

  return (
    <View key={String(singleDataDecrypted)} style={containerStyles}>
      {data.type === JOURNAL_TYPES.PROMPT && <Text style={styles.prompt}>{data.prompt}</Text>}
      <RenderHtml
        contentWidth={300}
        baseStyle={styles.text}
        tagsStyles={TagStyles}
        systemFonts={systemFonts}
        source={{ html: singleDataDecrypted || ''}}
      />
    </View> 
  );
};
