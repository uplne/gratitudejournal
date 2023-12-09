import { useEffect, useState } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { Entypo } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';
import AwesomeAlert from 'react-native-awesome-alerts';

import { ImageWrapper } from '../ImageWrapper';
import { ImageType, useJournalStore } from '../../state/JournalState';
import { useJournalEntryStore } from '../../state/JournalEntryState';

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
    const permissions = await checkPermissions();

    if (permissions) {
      SheetManager.show("MediaGallery");
    } else {
      setIsAlertOpen(true);
    }
  };

  const deleteImage = async (image: ImageType) => {
    await removeJournalEditedImages(image.id)
    // await FileSystem.deleteAsync(image.uri);
  };

  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 100;
  
  let imageWidth = DEFAULT_WIDTH;
  let imageHeight = DEFAULT_HEIGHT;
  const { width } = Dimensions.get('window');
  const offSet = 40;
  const safeZoneWidth = width - offSet;

  imageWidth = (safeZoneWidth / 3) * 0.95;
  imageHeight = imageWidth;
  
  const gapWidth = safeZoneWidth / 3 - imageWidth;
  const marginRight = gapWidth * 1.5;

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
          style={[...[styles.buttonImage], { width: imageWidth, height: imageHeight }]}
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
            Linking.openSettings();
            setIsAlertOpen(false);
          }}
        />
      }
    </View>
  );
};
