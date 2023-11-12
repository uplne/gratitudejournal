import { useEffect } from 'react';
import { View, TextInput, Keyboard, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { useJournalStore } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { Container } from '../../components/Container';
import { ImagePicker } from '../../components/ImagePicker';
import { AddTags } from '../../components/AddTags';

import styles from './styles';

type Props = {
  id: string | number[],
}

export const EditThreeThingsJournal = ({
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

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const data = journalItemData !== null ? journalItemData : new Array(3).fill('');
    updateJournalEditedText([
      data[0],
      data[1],
      data[2],
    ]);
    updateJournalTags(journalEntry?.tags || []);
  }, [journal]);

  const onChangeText = (text: string, position: number) => {
    const newArray = [...journalEditedText];
    newArray[position] = text;
    updateJournalEditedText(newArray);
  };

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
                <Entypo name="dot-single" size={24} color="black" />
                <TextInput
                  value={journalEditedText[0]}
                  multiline
                  onChangeText={(text) => onChangeText(text, 0)}
                  style={styles.textArea}
                  selectionColor={styles.textArea.selectionColor}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Entypo name="dot-single" size={24} color="black" />
                <TextInput
                  value={journalEditedText[1]}
                  multiline
                  onChangeText={(text) => onChangeText(text, 1)}
                  style={styles.textArea}
                  selectionColor={styles.textArea.selectionColor}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Entypo name="dot-single" size={24} color="black" />
                <TextInput
                  value={journalEditedText[2]}
                  multiline
                  onChangeText={(text) => onChangeText(text, 2)}
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
          <ButtonKeyboard onPress={keyboardPressHandler} style={styles.buttonKeyboard} />
        }
      </Container>
  );
};
