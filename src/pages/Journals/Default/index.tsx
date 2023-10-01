import { StatusBar, View } from 'react-native';
import { useState, useRef } from 'react';
import moment from 'moment';

import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';
import { ShowDate } from '../../../components/ShowDate';
import { ContentBlock } from '../../../components/ContentBlock';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { ButtonNext } from '../../../components/Buttons/ButtonNext';
import { useJournalStore, ImageType, JOURNAL_TYPES } from '../../../state/JournalState';
import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { ImagePicker } from '../../../components/ImagePicker';
import { RichTextEditor, RefTypes } from '../../../components/RichTextEditor';

import styles from './styles';

export const Default = () => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const [ date, setDate ] = useState(moment());
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const [text, setText] = useState('');
  const [image, setImage] = useState<ImageType | null>(null);
  const EditorRef = useRef<RefTypes | null>(null);

  const onSave = async () => {
    await setNewJournal({
      type: JOURNAL_TYPES.DEFAULT,
      date: date.toISOString(),
      data: text,
      image, 
    });
    resetToHome();
  };

  const isDisabled:boolean = false;

  const keyboardPressHandler = () => {
    EditorRef.current?.dismissKeyboard();
    setKeyboardVisible(false);
  };

  return (
    <ContainerWithHeader
      title="Blank Page Entry"
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      <Container>
        {/* <Pressable onPress={() => richText.current?.dismissKeyboard()}> */}
          <ShowDate date={date} setDate={setDate} />
          <View style={styles.inputWrapper}>
            {/* <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            > */}
              <RichTextEditor
                ref={EditorRef}
                setText={setText}
              />
              <View style={styles.bottomSection}>
                <ImagePicker
                  image={image}
                  setImage={setImage}
                />
              </View>
            {/* </ScrollView> */}
          </View>
          {isKeyboardVisible &&
            <ButtonKeyboard onPress={keyboardPressHandler} />
          }
        {/* </Pressable> */}
        <ContentBlock style={styles.floatingBlock}>
          <ButtonNext
            isDisabled={isDisabled}
            onPress={onSave}
          >
            Save
          </ButtonNext>
        </ContentBlock>
      </Container>
    </ContainerWithHeader>
  );
};
