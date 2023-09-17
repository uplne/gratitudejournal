import { useState, useEffect } from 'react';
import { View, TextInput, Keyboard, ScrollView } from 'react-native';

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

export const EditOneLineJournal = ({
  id,
  goBack,
}: Props) => {
  const { journal, updateJournal } = useJournalStore();
  const journalId = id;
  const journalItem = journal.filter((item) => item.id === journalId)[0] || null;
  const journalItemData = journal.filter((item) => item.id === journalId)[0]?.data || null;
  const [text, setText] = useState('');
  const [image, setImage] = useState(journalItem ? journalItem.image : null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const saveValue = async () => {
    setIsSaving(true);
    await updateJournal(
      journalId,
      JOURNAL_TYPES.ONE_LINE,
      text,
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
      JOURNAL_TYPES.ONE_LINE,
      text,
      null,
    );
    setImage(null);
    setIsSaving(false);
  };

  useEffect(() => {
    setText(typeof journalItemData === 'string' ? journalItemData : '');
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
                <TextInput
                  value={text}
                  onChangeText={setText}
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
          <ButtonKeyboard onPress={keyboardPressHandler} style={styles.buttonKeyboard}/>
        }
      </Container>
  );
};
