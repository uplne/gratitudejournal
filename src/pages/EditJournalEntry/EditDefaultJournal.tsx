import { useState, useEffect } from 'react';
import { View, TextInput, Keyboard, ScrollView } from 'react-native';

import { useJournalStore, JOURNAL_TYPES } from '../../state/JournalState';
import { ButtonNext } from '../../components/Buttons/ButtonNext';
import { ButtonKeyboard } from '../../components/Buttons/ButtonKeyboard';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import { ImageWrapper } from '../../components/ImageWrapper';
import { getImageSize } from '../../services/ImageSize';
import { Container } from '../../components/Container';

import styles from './styles';

type Props = {
  id: string | number[],
  goBack: () => void,
}

export const EditDefaultJournal = ({
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
      JOURNAL_TYPES.DEFAULT,
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

  const onDeleteImage = () => setImage(null);

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
                  multiline
                  onChangeText={setText}
                  style={styles.textAreaMultiline}
                  selectionColor={styles.textArea.selectionColor}
                />
              </View>
              {image &&
                <ImageWrapper
                  uri={image.uri}
                  width={imageWidth}
                  height={imageHeight}
                  onDelete={onDeleteImage}
                />
              }
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <ButtonNext
              onPress={saveValue}
              isLoading={isSaving}
            >
              Save
            </ButtonNext>
            {isKeyboardVisible &&
              <ButtonKeyboard onPress={keyboardPressHandler} style={styles.buttonKeyboard}/>
            }
          </View>
          
        </View>
      </Container>
  );
};
