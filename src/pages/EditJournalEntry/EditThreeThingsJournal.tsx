import { useState, useEffect } from 'react';
import { View, TextInput, Keyboard, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { useJournalStore, JOURNAL_TYPES } from '../../state/JournalState';
import { ButtonNext } from '../../components/Buttons/ButtonNext';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { getImageSize } from '../../services/ImageSize';
import { Container } from '../../components/Container';
import { ImageThumbnail } from '../../components/ImageThumbnail';

import styles from './styles';

type Props = {
  id: string | number[],
  goBack: () => void,
}

export const EditThreeThingsJournal = ({
  id,
  goBack,
}: Props) => {
  const { journal, updateJournal } = useJournalStore();
  const journalId = id;
  const journalItem = journal.filter((item) => item.id === journalId)[0] || null;
  const journalItemData = journal.filter((item) => item.id === journalId)[0]?.data || null;
  const [positive1, setPositive1] = useState(journalItemData ? journalItemData[0] : '');
  const [positive2, setPositive2] = useState(journalItemData ? journalItemData[1] : '');
  const [positive3, setPositive3] = useState(journalItemData ? journalItemData[2] : '');
  const [image, setImage] = useState(journalItem ? journalItem.image : null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const saveValue = async () => {
    setIsSaving(true);
    await updateJournal(
      journalId,
      JOURNAL_TYPES.THREE_THINGS,
      [
      positive1 || '',
      positive2 || '',
      positive3 || '',
      ], 
      image
    );
    setIsSaving(false);
    goBack();
  };

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  const onDeleteImage = async () => {
    setIsSaving(true);
    await updateJournal(
      journalId,
      JOURNAL_TYPES.THREE_THINGS,
      [
      positive1 || '',
      positive2 || '',
      positive3 || '',
      ],
      null,
    );
    setImage(null);
    setIsSaving(false);
  };

  useEffect(() => {
    setPositive1(journalItemData ? journalItemData[0] : '');
    setPositive2(journalItemData ? journalItemData[1] : '');
    setPositive3(journalItemData ? journalItemData[2] : '');
    setImage(journalItem ? journalItem.image : null);
  }, [journal]);

  let imageWidth = 0;
  let imageHeight = 0;

  if (image) {
    ({ imageWidth, imageHeight } = getImageSize(image.width, image.height, 40));
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
                <Entypo name="dot-single" size={24} color="black" />
                <TextInput
                  value={positive1}
                  multiline
                  onChangeText={setPositive1}
                  style={styles.textArea}
                  selectionColor={styles.textArea.selectionColor}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Entypo name="dot-single" size={24} color="black" />
                <TextInput
                  value={positive2}
                  multiline
                  onChangeText={setPositive2}
                  style={styles.textArea}
                  selectionColor={styles.textArea.selectionColor}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Entypo name="dot-single" size={24} color="black" />
                <TextInput
                  value={positive3}
                  multiline
                  onChangeText={setPositive3}
                  style={styles.textArea}
                  selectionColor={styles.textArea.selectionColor}
                />
              </View>
              <ImageThumbnail 
                image={image}
                setImage={setImage}
                onDeleteImage={onDeleteImage}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <ButtonNext
              onPress={saveValue}
              isLoading={isSaving}
            >
              Save
            </ButtonNext>
          </View>
        </View>
        {isKeyboardVisible &&
          <ButtonKeyboard onPress={keyboardPressHandler} style={styles.buttonKeyboard} />
        }
      </Container>
  );
};
