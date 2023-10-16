import { useEffect } from 'react';
import { View } from 'react-native';
import { Pressable } from "native-base";
import { Entypo } from '@expo/vector-icons';
import * as ImagePick from 'expo-image-picker';
import uuid from 'react-native-uuid';

import { ImageWrapper } from '../ImageWrapper';
import { getImageSize } from '../../services/ImageSize';
import { useJournalStore } from '../../state/JournalState';
import { useAppStateStore } from '../../state/AppState';
import { useJournalEntryStore } from '../../state/JournalEntryState';

import styles from './styles';
import { idType } from 'src/types/idtype';

type ComponentPropTypes = {
  journalId?: idType | undefined,
};

export const ImagePicker = ({
  journalId = undefined,
}: ComponentPropTypes) => {
  const {
    journalEditedImages,
    resetJournalEditedImages,
    addJournalEditedImages,
    removeJournalEditedImages,
  } = useJournalEntryStore();
  const updateShouldLock = useAppStateStore((state) => state.updateShouldLock);
  const { journal } = useJournalStore();

  useEffect(() => {
    const initFunc = async () => {
      await resetJournalEditedImages();
    
      if (journalId) {
        const journalItem = journal.filter((item) => item.id === journalId)[0] || null;

        if (journalItem && journalItem.images) {
          await addJournalEditedImages(journalItem.images);
        }
      }
    };

    initFunc();
  }, []);

  const pickImage = async () => {
    await updateShouldLock(false);
    let result = await ImagePick.launchImageLibraryAsync({
      mediaTypes: ImagePick.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    await updateShouldLock(true);

    if (!result.canceled && result?.assets) {
      const item = result?.assets[0];

      if (!item) {
        return;
      }

      addJournalEditedImages([{
        id: uuid.v4(),
        uri: item.uri,
        width: item.width,
        height: item.height,
        exif: item.exif || null,
      }]);
    }
  };

  return (
    <View style={styles.root}>
      {journalEditedImages.length > 0 &&
        journalEditedImages.map((image) => {
          let imageWidth = 0;
          let imageHeight = 0;

          if (image) {
            ({ imageWidth, imageHeight } = getImageSize(image.width, image.height, 40));
          }

          return (
            <ImageWrapper
              imageId={image.id}
              uri={image.uri}
              width={imageWidth}
              height={imageHeight}
              onDelete={removeJournalEditedImages}
            />
          );
        })
      }
      {journalEditedImages.length < 3 &&
        <Pressable
          style={styles.buttonImage}
          onPress={pickImage}
        >
          <Entypo name="plus" size={30} color="rgba(0,0,0,.3)" />
        </Pressable>
      }
    </View>
  );
};
