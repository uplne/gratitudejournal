import { useEffect, useRef } from 'react';
import { View, Text, Keyboard, ScrollView } from 'react-native';

import { useJournalStore } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { Container } from '../../components/Container';
import { RichTextEditor, RefTypes } from '../../components/RichTextEditor';
import { ImagePicker } from '../../components/ImagePicker';
import { AddTags } from '../../components/AddTags';

import styles from './styles';

type Props = {
  id: string | number[],
}

export const EditPromptJournal = ({
  id,
}: Props) => {
  const { journal } = useJournalStore();
  const {
    journalEditedText,
    updateJournalEditedText,
    updateJournalTags,
  } = useJournalEntryStore();
  const journalId = id;
  const journalEntry = journal.filter((item) => item.id === journalId)[0];
  const journalItemData = journalEntry?.data || null;
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();
  const EditorRef = useRef<RefTypes | null>(null);

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
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
            <Text style={styles.prompt}>{journalEntry?.prompt}</Text>
            <View style={styles.innerWrap}>
              <RichTextEditor
                ref={EditorRef}
                initialContentHTML={journalEditedText}
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
