import { useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import { useJournalStore, decryptData } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { useAppStateStore } from '../../state/AppState';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { Container } from '../../components/Container';
import { RichTextEditor, RefTypes } from '../../components/RichTextEditor';
import { ImagePicker } from '../../components/ImagePicker';
import { AddTags } from '../../components/AddTags';

import styles from './styles';

type Props = {
  id: string | number[],
};

export const EditDefaultJournal = ({
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
  const EditorRef = useRef<RefTypes | null>(null);

  const keyboardPressHandler = () => {
    EditorRef.current?.dismissKeyboard();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    updateJournalEditedText(typeof journalItemData === 'string' ? journalItemData : '');
    updateJournalTags(journalEntry?.tags || []);
  }, [journal]);

  return (
      <Container>
        <View style={styles.viewWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.9}
          >
            <View style={styles.innerWrap}>
              <RichTextEditor
                ref={EditorRef}
                initialContentHTML={decryptData(journalEditedText, appState.userHash)?.toString()}
                setText={updateJournalEditedText}
              />
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
