import { useEffect } from 'react';
import { View, TextInput, Keyboard, ScrollView } from 'react-native';

import { useJournalStore } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { Container } from '../../components/Container';
import { ImagePicker } from '../../components/ImagePicker';

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
  } = useJournalEntryStore();
  const journalId = id;
  const journalItemData = journal.filter((item) => item.id === journalId)[0]?.data || null;
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();
  let text = journalEditedText;

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    updateJournalEditedText(typeof journalItemData === 'string' ? journalItemData : '');
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
                value={text}
                onChangeText={updateJournalEditedText}
                style={styles.textArea}
                selectionColor={styles.textArea.selectionColor}
              />
            </View>
            <ImagePicker journalId={journalId} />
          </View>
        </ScrollView>
      </View>
      {isKeyboardVisible &&
        <ButtonKeyboard onPress={keyboardPressHandler} style={styles.buttonKeyboard}/>
      }
    </Container>
  );
};
