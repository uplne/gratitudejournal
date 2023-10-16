import { useState } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
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
  width: number,
  height: number,
  smallGap?: boolean,
  onDelete?: (imageId: idType) => void,
};

export const ImageWrapper = ({
  journalId,
  imageId,
  uri,
  width,
  height,
  smallGap = false,
  onDelete,
}: ComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const [ isOpen, setIsOpen ] = useState(false);
  const { width: windowWidth } = Dimensions.get('window');
  const gap = 20;
  const itemPerRow = 2;
  const totalGapSize = (itemPerRow - 1) * gap;
  const windowWidthWithOffset = windowWidth - 40;
  const childWidth = (windowWidthWithOffset - totalGapSize) / itemPerRow;

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
            {/* <MaterialIcons name="delete" size={16} color="black" /> */}
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
