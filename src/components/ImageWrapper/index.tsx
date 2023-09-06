import { Image, View } from 'react-native';
import { Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

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
  return (
    <View style={styles.root}>
      {onDelete && 
        <Pressable
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      }
      <Image
        style={[...[styles.image], { width, height }]}
        source={{uri}}
      />
    </View>
  );
};
