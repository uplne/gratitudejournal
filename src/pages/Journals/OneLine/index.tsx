import { StatusBar, View, TextInput, Keyboard, ScrollView } from 'react-native';
import { useState } from 'react';
import moment from 'moment';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../../App';
import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { ShowDate } from '../../../components/ShowDate';
import { ContentBlock } from '../../../components/ContentBlock';
import { ButtonNext } from '../../../components/Buttons/ButtonNext';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { useJournalStore, ImageType, JOURNAL_TYPES } from '../../../state/JournalState';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';
import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { ImagePicker } from '../../../components/ImagePicker';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Default'>;

export const OneLine = ({
  route,
}: Props) => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const date = moment(route.params?.date || new Date()).toISOString();

  const [text, setText] = useState('');
  const [image, setImage] = useState<ImageType | null>(null);

  const onSave = async () => {
    await setNewJournal({
      type: JOURNAL_TYPES.ONE_LINE,
      date,
      data: text,
      image, 
    });
    resetToHome();
  };

  const keyboardPressHandler = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  const isDisabled:boolean = false;

  return (
    <ContainerWithHeader
      title="One Line Entry"
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      <Container>
        <ShowDate date={date} />
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
