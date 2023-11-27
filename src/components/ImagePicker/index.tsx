import { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { Entypo } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AwesomeAlert from 'react-native-awesome-alerts';

import { ImageWrapper } from '../ImageWrapper';
import { ImageType, useJournalStore } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { useAppStateStore } from '../../state/AppState';

import styles from './styles';
import { idType } from 'src/types/idtype';

export const PHOTOS_FOLDER = `${FileSystem.documentDirectory || ''}gratitudejournal_photos`;

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
  const { journal } = useJournalStore();
  const updateShouldLock = useAppStateStore((state) => state.updateShouldLock);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const initializeFolder = async () => {
    const info = await FileSystem.getInfoAsync(PHOTOS_FOLDER)

    if (info.exists) {
        return Promise.resolve()
    }

    return await FileSystem.makeDirectoryAsync(PHOTOS_FOLDER, { intermediates: true })
  };

  useEffect(() => {
    const initFunc = async () => {
      await resetJournalEditedImages();
      await initializeFolder();
    
      if (journalId) {
        const journalItem = journal.filter((item) => item.id === journalId)[0] || null;

        if (journalItem && journalItem.images) {
          await addJournalEditedImages(journalItem.images);
        }
      }
    };

    initFunc();
  }, []);

  const checkPermissions = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (!permission.granted) {
      const result = await MediaLibrary.requestPermissionsAsync();
      
      if (!result.granted) {
        // TODO - show something
        console.log('No access granted to media library');
        return false;
      }

      return true;
    }

    return permission.granted;
  };

  const pickImage = async () => {
    await updateShouldLock(false);
    const permissions = await checkPermissions();

    if (permissions) {
      await updateShouldLock(true);
      SheetManager.show("MediaGallery");
    } else {
      await updateShouldLock(true);
      setIsAlertOpen(true);
    }
  };

  const deleteImage = async (image: ImageType) => {
    await removeJournalEditedImages(image.id)
    // await FileSystem.deleteAsync(image.uri);
  };

  return (
    <View style={styles.root}>
      {journalEditedImages.length > 0 &&
        journalEditedImages.map((image) => {
          return (
            <ImageWrapper
              imageId={image.id}
              uri={image.uri}
              onDelete={() => deleteImage(image)}
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
      {isAlertOpen &&
        <AwesomeAlert
          show={isAlertOpen}
          showProgress={false}
          title="No Permission To Access Media"
          message="Please allow access to media in Permission Manager."
          closeOnTouchOutside={true}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setIsAlertOpen(false);
          }}
        />
      }
    </View>
  );
};
