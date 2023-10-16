import { View } from 'react-native';

import { ImageWrapper } from '../ImageWrapper';
import { getImageSize } from '../../services/ImageSize';
import { useJournalStore } from '../../state/JournalState';
import { idType } from '../../types/idtype';

import styles from './styles';

type ComponentProps = {
  journalId: idType,
};

export const ImageThumbnails = ({
  journalId,
}: ComponentProps) => {
  const { journal } = useJournalStore();
  const journalItem = journal.filter((item) => item.id === journalId)[0] || null;

  if (!journalItem || !journalItem.images) {
    return null;
  }

  return (
    <View style={styles.root}>
      {journalItem.images.length > 0 &&
        journalItem.images.map((image) => {
          let imageWidth = 0;
          let imageHeight = 0;

          if (image) {
            ({ imageWidth, imageHeight } = getImageSize(image.width, image.height, 40));
          }

          return (
            <ImageWrapper
              journalId={journalId}
              imageId={image.id}
              uri={image.uri}
              width={imageWidth}
              height={imageHeight}
              smallGap
            />
          );
        })
      }
    </View>
  );
};
