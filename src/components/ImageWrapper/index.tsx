import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "native-base";

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
  
  const imageWidth = DEFAULT_WIDTH;
  const imageHeight = DEFAULT_HEIGHT;
  const marginRight = smallGap ? 15 : styles.root.marginRight;

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
