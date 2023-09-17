import { useState } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import { Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { Delete } from '../Alerts/Delete';

import styles from './styles';

type ComponentProps = {
  uri: string,
  width: number,
  height: number,
  onDelete?: () => void,
};

export const ImageWrapper = ({
  uri,
  width,
  height,
  onDelete,
}: ComponentProps) => {
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

  return (
    <View style={styles.root}>
      <Image
        style={[...[styles.image], { width: imageWidth, height: imageHeight }]}
        source={{uri }}
      />
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
            deleteHandler={onDelete}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      }
    </View>
  );
};
