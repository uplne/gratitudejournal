import { useEffect } from 'react';
import { View, TextInput, Keyboard, ScrollView } from 'react-native';

import { useJournalStore, decryptData } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { useAppStateStore } from '../../state/AppState';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { Container } from '../../components/Container';
import { ImagePicker } from '../../components/ImagePicker';
import { AddTags } from '../../components/AddTags';

import styles from './styles';

type Props = {
  id: string | number[],
}

export const EditOneLineJournal = ({
  id,
}: Props) => {
  const { journal } = useJournalStore();
  const {
    journalEditedText,
    updateJournalEditedText,
    updateJournalTags,
  } = useJournalEntryStore();
  const { appState } = useAppStateStore();
  const journalId = id;
  const journalEntry = journal.filter((item) => item.id === journalId)[0];
  const journalItemData = journalEntry?.data || null;
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();
  let text = journalEditedText;

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    updateJournalEditedText(typeof journalItemData === 'string' ? journalItemData : '');
    updateJournalTags(journalEntry?.tags || []);
  }, [journal]);

  if (typeof text !== 'string') {
    text = '';
  }

  return (
    <Container>
      <View style={styles.viewWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.9}
        >
          <View style={styles.innerWrap}>
            <View style={styles.textInputContainer}>
              <TextInput
                value={decryptData(text, appState.userHash)?.toString()}
                onChangeText={updateJournalEditedText}
                style={styles.textArea}
                selectionColor={styles.textArea.selectionColor}
              />
            </View>
            <ImagePicker journalId={journalId} />
            <AddTags />
          </View>
        </ScrollView>
      </View>
      {isKeyboardVisible &&
        <ButtonKeyboard onPress={keyboardPressHandler} style={styles.buttonKeyboard}/>
      }
    </Container>
  );
};
