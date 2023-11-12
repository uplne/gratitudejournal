import { Image, Text, View, Dimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import Swiper from 'react-native-deck-swiper';

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useJournalStore } from '../../state/JournalState';
import { RootStackParamList } from '../../../App';
import { getImageSize } from '../../services/ImageSize';
import { ImageType } from '../../state/JournalState';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditJournalEntry'>;

export const ImageGallery = ({
  route,
}: Props) => {
  const { journal } = useJournalStore();
  const journalId = route.params?.id;
  const journalItem = journal.filter((item) => item.id === journalId)[0] || null;

  let images: ImageType[] = [];
  let cardIndex = 0;

  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 100;
  
  let imageWidth = DEFAULT_WIDTH;
  let imageHeight = DEFAULT_HEIGHT;

  if (!journalItem) {
    return (
      <ContainerWithHeader
        title="No Journal Entry Found"
        style={styles.root}
        modal
      >

      </ContainerWithHeader>
    );
  }

  if (journalItem.images) {
    journalItem.images.forEach((image) => {
      ({ imageWidth, imageHeight } = getImageSize(image.width, image.height, 40));

      images.push({
        id: image.id,
        uri: image.uri,
        width: imageWidth,
        height: imageHeight,
        exif: image.exif,
      });
    })
  }

  return (
    <ContainerWithHeader
      title={moment(journalItem.date).format('Do MMM YYYY')}
      style={styles.root}
    >
      <View style={styles.root}>
        <Swiper
          cards={images}
          renderCard={(image) => {
            return (
              <Image
                style={[styles.card, { width: image.width, height: image.height }]}
                source={{uri: image.uri}}
              />
            )
          }}
          cardIndex={cardIndex}
          infinite
          horizontalSwipe
          verticalSwipe={false}
          backgroundColor='transparent'
          stackSize= {3}
          cardHorizontalMargin={20}
          cardVerticalMargin={0}
        />
      </View>
    </ContainerWithHeader>
  );
};
