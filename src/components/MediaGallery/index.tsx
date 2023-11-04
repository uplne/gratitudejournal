import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, Pressable } from 'react-native';
import ActionSheet, { SheetProps, SheetManager } from "react-native-actions-sheet";
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import debounce from 'lodash/debounce';
import { AntDesign } from '@expo/vector-icons'; 
import uuid from 'react-native-uuid';
import * as MediaLibrary from 'expo-media-library';

import { StackNavigation } from '../../types/navigation-types';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import theme from '../../styles/theme';
import { Tag } from '../Tag';
import { TrackingEvent } from '../../services/Tracking';

import styles from './styles';

export const MediaGallery = (props: SheetProps<{ value: string }>) => {
  const navigation = useNavigation<StackNavigation>();
  const {
    addJournalEditedImages,
  } = useJournalEntryStore();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [lastPhotoDate, setLastPhotoDate] = useState<number | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<MediaLibrary.Asset | undefined>(undefined);

  const getPhotosFromAlbum = async (album: string, createdBefore: number | undefined = undefined) => {
    const result = await MediaLibrary.getAlbumAsync(album);
    const getAllPhotos = await MediaLibrary.getAssetsAsync({
      first: 100,
      album: result,
      sortBy: ['creationTime'],
      mediaType: ['photo'],
      createdBefore,
    });
    await setPhotos([...photos, ...getAllPhotos?.assets]);
    const lastPhoto = getAllPhotos?.assets[getAllPhotos?.assets.length - 1];
    await setLastPhotoDate(lastPhoto?.creationTime);
  };

  useEffect(() => {
    (async () => {
      await getPhotosFromAlbum('Camera');
    })();
  }, []);

  const loadMode = async () => {
    // Limit to 500 photos for now
    if (photos.length < 500) {
      await getPhotosFromAlbum('Camera', lastPhotoDate);
    }
  };

  const imageSelector = async (image: MediaLibrary.Asset) => {
    await setSelectedImage(image);
    const getPhotoData = await MediaLibrary.getAssetInfoAsync(image.id);

    await addJournalEditedImages([{
      id: uuid.v4(),
      uri: image.uri,
      width: image.width,
      height: image.height,
      exif: getPhotoData.exif || null,
    }]);
    await TrackingEvent('Media Gallery', { "Image": 'Add'});
    SheetManager.hide("MediaGallery");
  };

  const { width } = Dimensions.get('window');
  const MediaLibraryWidth = width;

  return (
    <ActionSheet id={props.sheetId}>
      <View style={styles.root}>
        <Text style={styles.title}>Select Image</Text>
        <IconButton
          icon='close'
          style={styles.iconButton}
          onPress={() => SheetManager.hide("MediaGallery")}
        />

        <View style={[styles.row, styles.albumsRow]}>
          <View>
            <Text style={styles.albums}>Album:</Text>
          </View>
          <View>
            <Tag>Camera</Tag>
          </View>
        </View>

        <View style={styles.row}>
          <FlatList
            contentContainerStyle={[styles.imageList, {
              width: MediaLibraryWidth,
              paddingBottom: MediaLibraryWidth / 2,
            }]}
            numColumns={3}
            data={photos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: any) => {
              const imageWidth = MediaLibraryWidth / 3.3333;
              const imageHeight = imageWidth;

              return (
                <Pressable
                  style={styles.pressable}
                  onPress={() => imageSelector(item)}
                >
                  { selectedImage?.id === item.id &&
                    <AntDesign style={styles.checkIcon} name="checkcircle" size={24} color={theme.colorPrimaryLight} />
                  }
                  <Image
                    style={[{ width: imageWidth, height: imageHeight, opacity: selectedImage?.id === item.id ? 0.7 : 1 }]}
                    source={{uri: item.uri}}
                    key={item.uri}
                  />
                </Pressable>
              )
            }}
            onEndReached={debounce(loadMode, 250)}
            onEndReachedThreshold={0.01}
          />
        </View>
      </View>
    </ActionSheet>
  );
};
