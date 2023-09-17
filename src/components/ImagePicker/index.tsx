import { Text } from 'react-native';
import { Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePick from 'expo-image-picker';

import { ImageWrapper } from '../ImageWrapper';
import { getImageSize } from '../../services/ImageSize';
import { ImageType } from '../../state/JournalState';

import styles from './styles';

type ComponentProps = {
  image: ImageType | null,
  setImage: (values: ImageType | null) => void,
};

export const ImagePicker = ({
  image,
  setImage,
}: ComponentProps) => {
  let imageWidth = 0;
  let imageHeight = 0;

  if (image) {
    ({ imageWidth, imageHeight } = getImageSize(image.width, image.height, 40));
  }

  const pickImage = async () => {
    let result = await ImagePick.launchImageLibraryAsync({
      mediaTypes: ImagePick.MediaTypeOptions.Images,
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

  return (
    <>
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
    </>
  );
};
