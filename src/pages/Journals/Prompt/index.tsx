import { Text, StatusBar, View, TextInput, Keyboard, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Pressable } from "native-base";
import moment from 'moment';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { RootStackParamList } from '../../../../App';
import { ContainerWithHeader } from '../../../components/ContainerWithHeader';
import { ShowDate } from '../../../components/ShowDate';
import { ContentBlock } from '../../../components/ContentBlock';
import { ButtonNext } from '../../../components/Buttons/ButtonNext';
import { ButtonKeyboard } from '../../../components/Buttons/ButtonKeyboard';
import { useJournalStore, ImageType, JOURNAL_TYPES } from '../../../state/JournalState';
import { useKeyboardShow } from '../../../hooks/useKeyboardShow';
import { getImageSize } from '../../../services/ImageSize';
import { ImageWrapper } from '../../../components/ImageWrapper';
import { Container } from '../../../components/Container';
import { resetNavigationToHome } from '../../../hooks/resetNavigationToHome';
import { JournalPrompts } from './JournalPrompts';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Prompt'>;

export const Prompt = ({
  route,
}: Props) => {
  const { resetToHome } = resetNavigationToHome();
  const { setNewJournal } = useJournalStore();
  const [prompt, setPrompt] = useState('');
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardShow();

  const date = moment(route.params?.date || new Date()).toISOString();

  const [text, setText] = useState('');
  const [image, setImage] = useState<ImageType | null>(null);

  const onSave = async () => {
    await setNewJournal({
      type: JOURNAL_TYPES.PROMPT,
      date,
      data: text,
      prompt,
      image, 
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
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result?.assets) {
      const item = result?.assets[0];

      if (!item) {
        setImage(null);
        return;
      }

      setImage({
        uri: item.uri,
        width: item.width,
        height: item.height,
      });
    }
  };

  const onDelete = () => setImage(null);

  const isDisabled:boolean = false;

  let imageWidth = 0;
  let imageHeight = 0;

  if (image) {
    ({ imageWidth, imageHeight } = getImageSize(image.width, image.height, 40));
  }

  return (
    <ContainerWithHeader
      title="Write With Prompt"
      modal
    >
      <StatusBar translucent backgroundColor='transparent' />
      <Container>
        <ShowDate date={date} />
        <Pressable
          style={styles.buttonPrompt}
          onPress={requestPrompt}
        >
          <Entypo name="shuffle" style={styles.buttonImageIcon} size={18} color="black" />
          <Text style={styles.buttonImageText}>New prompt</Text>
        </Pressable>
        <Text style={styles.prompt}>{prompt}</Text>
        <View style={styles.inputWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.textInputContainer}>
              <TextInput
                value={text}
                multiline
                onChangeText={setText}
                style={styles.textArea}
                selectionColor={styles.textArea.selectionColor}
              />
            </View>
            <View style={styles.bottomSection}>
              {image &&
                <ImageWrapper
                  uri={image.uri}
                  width={imageWidth}
                  height={imageHeight}
                  onDelete={onDelete}
                />
              }
              <Pressable
                style={styles.buttonImage}
                onPress={pickImage}
              >
                <MaterialIcons name="add-photo-alternate" style={styles.buttonImageIcon} size={24} color="black" />
                <Text style={styles.buttonImageText}>Add image</Text>
              </Pressable>
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
