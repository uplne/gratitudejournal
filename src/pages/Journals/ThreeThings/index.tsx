import { StatusBar, View, TextInput, Keyboard, ScrollView } from 'react-native';
import { useState } from 'react';

import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { ShowDate } from '../../../components/ShowDate';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { useJournalStore, ImageType, JOURNAL_TYPES } from '../../../state/JournalState';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';

import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { ImagePicker } from '../../../components/ImagePicker';

import styles from './styles';

export const ThreeThings = () => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();
  const [ date, setDate ] = useState(moment());
  const [positive, setPositive] = useState<string[]>(new Array(3).fill(''));
  const [image, setImage] = useState<ImageType | null>(null);

  const onSave = async () => {
    const filterOutEmpty = positive.filter((item) => item !== '');
    const newArray = new Array(3).fill('').map((_, index) => {
      if (filterOutEmpty[index]) {
        return filterOutEmpty[index];
      }

      return '';
    });

    await setNewJournal({
      type: JOURNAL_TYPES.THREE_THINGS,
      date: date.toISOString(),
      data: newArray,
      image, 
    });
    resetToHome();
  };

  const setPositiveHandler = (value: string, id: number) => {
    const newArray = [...positive];
    newArray[id] = value;
    setPositive(newArray);
  };

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  return (
    <ContainerWithHeader
      title="Three Positive Things Entry"
      allowSave={onSave}
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      {/* <ImageBackground source={asset} style={styles.headerImage} /> */}
      <Container>
        <ShowDate date={date} setDate={setDate} />
        <View style={styles.inputWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.textInputContainer}>
              <Entypo name="dot-single" size={24} color="black" />
              <TextInput
                value={positive[0] || ''}
                multiline
                onChangeText={(value) => setPositiveHandler(value, 0)}
                style={styles.textArea}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Entypo name="dot-single" size={24} color="black" />
              <TextInput
                value={positive[1] || ''}
                multiline
                onChangeText={(value) => setPositiveHandler(value, 1)}
                style={styles.textArea}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Entypo name="dot-single" size={24} color="black" />
              <TextInput
                value={positive[2] || ''}
                multiline
                onChangeText={(value) => setPositiveHandler(value, 2)}
                style={styles.textArea}
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
