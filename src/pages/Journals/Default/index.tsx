import { StatusBar, View } from 'react-native';
import { useState, useRef } from 'react';
import moment from 'moment';

import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';
import { ShowDate } from '../../../components/ShowDate';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { useJournalStore, JOURNAL_TYPES } from '../../../state/JournalState';
import { useJournalEntryStore } from '../../../state/JournalEntryState';
import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { ImagePicker } from '../../../components/ImagePicker';
import { RichTextEditor, RefTypes } from '../../../components/RichTextEditor';

import styles from './styles';

export const Default = () => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const { journalEditedImages } = useJournalEntryStore();
  const [ date, setDate ] = useState(moment());
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const [text, setText] = useState('');
  const EditorRef = useRef<RefTypes | null>(null);

  const onSave = async () => {
    await setNewJournal({
      type: JOURNAL_TYPES.DEFAULT,
      date: date.toISOString(),
      data: text,
      images: journalEditedImages,
    });
    resetToHome();
  };

  const keyboardPressHandler = () => {
    EditorRef.current?.dismissKeyboard();
    setKeyboardVisible(false);
  };

  return (
    <ContainerWithHeader
      allowSave={onSave}
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      <Container>
        <ShowDate date={date} setDate={setDate} />
        <View style={styles.inputWrapper}>
          <RichTextEditor
            ref={EditorRef}
            setText={setText}
          />
          <ImagePicker />
        </View>
        {isKeyboardVisible &&
          <ButtonKeyboard onPress={keyboardPressHandler} />
        }
      </Container>
    </ContainerWithHeader>
  );
};
