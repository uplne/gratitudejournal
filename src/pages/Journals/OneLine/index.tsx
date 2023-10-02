import { StatusBar, View, TextInput, Keyboard, ScrollView } from 'react-native';
import { useState } from 'react';
import moment from 'moment';

import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { ShowDate } from '../../../components/ShowDate';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { useJournalStore, ImageType, JOURNAL_TYPES } from '../../../state/JournalState';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';
import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { ImagePicker } from '../../../components/ImagePicker';

import styles from './styles';

export const OneLine = () => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const [ date, setDate ] = useState(moment());
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const [text, setText] = useState('');
  const [image, setImage] = useState<ImageType | null>(null);

  const onSave = async () => {
    await setNewJournal({
      type: JOURNAL_TYPES.ONE_LINE,
      date: date.toISOString(),
      data: text,
      image, 
    });
    resetToHome();
  };

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  return (
    <ContainerWithHeader
      title="One Line Entry"
      allowSave={onSave}
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      <Container>
        <ShowDate date={date} setDate={setDate} />
        <View style={styles.inputWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.textInputContainer}>
              <TextInput
                value={text}
                onChangeText={setText}
                style={styles.textArea}
                selectionColor={styles.textArea.selectionColor}
              />
            </View>
            <View style={styles.bottomSection}>
              <ImagePicker
                image={image}
                setImage={setImage}
              />
            </View>
          </ScrollView>
        </View>
        {isKeyboardVisible &&
          <ButtonKeyboard onPress={keyboardPressHandler} />
        }
      </Container>
    </ContainerWithHeader>
  );
};
