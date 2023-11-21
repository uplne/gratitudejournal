import { useState } from 'react';
import { Pressable, Image, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { idType } from '../../types/idtype';
import { Delete } from '../Alerts/Delete';
import { StackNavigation } from '../../types/navigation-types';

import styles from './styles';

type ComponentProps = {
  journalId?: idType | undefined,
  imageId: idType,
  uri: string,
  smallGap?: boolean,
  onDelete?: (imageId: idType) => void,
};

export const ImageWrapper = ({
  journalId,
  imageId,
  uri,
  smallGap = false,
  onDelete,
}: ComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const [ isOpen, setIsOpen ] = useState(false);

  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 100;
  
  let imageWidth = DEFAULT_WIDTH;
  let imageHeight = DEFAULT_HEIGHT;
  const { width } = Dimensions.get('window');
  const offSet = smallGap ? 80 : 40;
  const safeZoneWidth = width - offSet;

  imageWidth = (safeZoneWidth / 3) * 0.95;
  imageHeight = imageWidth;
  
  const gapWidth = safeZoneWidth / 3 - imageWidth;
  const marginRight = gapWidth * 1.5;

  return (
    <View style={[styles.root, { marginRight }]}>
      {journalId &&
        <Pressable
          onPress={() => navigation.navigate('ImageGallery', {
            id: journalId,
          })}
        >
          <Image
            style={[...[styles.image], { width: imageWidth, height: imageHeight }]}
            source={{uri}}
          />
        </Pressable>
      }
      {!journalId &&
        <Image
          style={[...[styles.image], { width: imageWidth, height: imageHeight }]}
          source={{uri }}
        />
      }
      {onDelete && 
        <>
          <Pressable
            style={[styles.deleteButton, { width: imageWidth }]}
            onPress={() => setIsOpen(true)}
          >
            <Text style={styles.buttonImageText}>Remove</Text>
          </Pressable>
          <Delete
            title="Remove Image"
            deleteButtonLabel="Remove"
            deleteHandler={() => {
              onDelete(imageId);
              setIsOpen(false);
            }}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      }
    </View>
  );
};
