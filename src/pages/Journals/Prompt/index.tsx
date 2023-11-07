import { Text, StatusBar, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Pressable } from "native-base";
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { ShowDate } from '../../../components/ShowDate';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { useJournalStore, JOURNAL_TYPES } from '../../../state/JournalState';
import { useJournalEntryStore } from '../../../state/JournalEntryState';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';
import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { JournalPrompts } from './JournalPrompts';
import { ImagePicker } from '../../../components/ImagePicker';
import { RichTextEditor, RefTypes } from '../../../components/RichTextEditor';
import { AddTags } from '../../../components/AddTags';

import styles from './styles';

export const Prompt = () => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const { journalEditedImages } = useJournalEntryStore();
  const [ date, setDate ] = useState(moment());
  const [prompt, setPrompt] = useState('');
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const [text, setText] = useState('');
  const EditorRef = useRef<RefTypes | null>(null);

  const onSave = async () => {
    await setNewJournal({
      type: JOURNAL_TYPES.PROMPT,
      date: date.toISOString(),
      data: text,
      prompt,
      images: journalEditedImages,
    });
    resetToHome();
  };

  const requestPrompt = () => {
    const numberOfPrompts = JournalPrompts.length;
    const promptNumber = Math.floor(Math.random() * numberOfPrompts) + 1;
    const newPrompt = JournalPrompts[promptNumber] || '';

    setPrompt(newPrompt);
  };

  useEffect(() => {
    requestPrompt();
  }, []);

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
        {!isKeyboardVisible &&
        <Pressable
          style={styles.buttonPrompt}
          onPress={requestPrompt}
        >
          <Entypo name="shuffle" style={styles.buttonImageIcon} size={18} color="black" />
          <Text style={styles.buttonImageText}>New prompt</Text>
        </Pressable>
        }
        <Text style={styles.prompt}>{prompt}</Text>
        <View style={styles.inputWrapper}>
          <RichTextEditor
            ref={EditorRef}
            setText={setText}
          />
          <ImagePicker />
          <AddTags />
        </View>
        {isKeyboardVisible &&
          <ButtonKeyboard onPress={keyboardPressHandler} />
        }
      </Container>
    </ContainerWithHeader>
  );
};
