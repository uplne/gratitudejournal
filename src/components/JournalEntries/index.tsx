import { View, Text, FlatList } from 'react-native';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import {
  flow,
  groupBy,
  toPairs,
  sortBy,
  first,
} from 'lodash/fp';

import { useJournalContext, JournalTypes, JOURNAL_TYPES } from '../../context/JournalContext';
import { JournalItem } from '../JournalItem';
import { getImageSize } from '../../services/ImageSize';
import { ImageWrapper } from '../ImageWrapper';

import styles from './styles';

type Props = {
  lastOnly?: boolean,
};

export const JournalEntries = ({
  lastOnly = false,
}: Props) => {
  const { journal } = useJournalContext();
  const hasJournal = journal.length > 0;
  let currentMonth = moment(new Date());
  let currentDay: moment.Moment | null = null;

  const renderData = (post:JournalTypes) => {
    if (typeof post.data !== 'string') {
      return (
        <View>
          {post.data.map((item) => {
            if (item === '') {
              return null;
            }

            return (
            <View key={item} style={styles.container}>
              <Entypo style={styles.icon} name="dot-single" size={24} color="black" />
              <Text style={styles.text}>{item}</Text>
            </View> 
            );
          })}
        </View>
      );
    }

    const containerStyles = post.type === JOURNAL_TYPES.RANDOM ? styles.containerWithPrompt : styles.container

    return (
      <View key={post.data} style={containerStyles}>
        {post.type === JOURNAL_TYPES.RANDOM && <Text style={styles.prompt}>{post.prompt}</Text>}
        <Text style={styles.text}>{post.data}</Text>
      </View> 
    );
  };

  const getFooter = () => <View style={styles.footer} />;

  const generateDate = (date: string) => {
    if (moment(date).isSame(new Date(), 'day')) {
      return 'Today';
    }

    if (moment(new Date()).subtract(1, 'days').isSame(moment(date), 'day')) {
      return 'Yesterday';
    }

    return moment(date).format('ddd Do MMMM YYYY');
  };

  if (!hasJournal) {
    return (
      <View style={styles.empty}>
        <Text>Your Journal is Empty</Text>
      </View>
    );
  }

  const groupGratitude = () => {
    let result = flow(
      groupBy('date'),
      toPairs,
      sortBy(2),
    )(journal);
  
    if (lastOnly) {
      return [flow(
        first,
      )(result)];
    }

    return result;
  };

  let renderMonth = false;

  return (
    <FlatList
      style={styles.root}
      data={groupGratitude()}
      renderItem={({item}) => {
        const items = flow(
          sortBy('ordial'),
        )(item[1]);

        return (
          <>
            {items.map((journalPost:JournalTypes) => {
              let renderDate = true;
              let imageWidth = 0;
              let imageHeight = 0;

              if (!moment(journalPost.date).isSame(currentMonth, 'month')) {
                renderMonth = true;
              } else {
                renderMonth = false;
              }

              if (moment(journalPost.date).isSame(currentDay, 'day')) {
                renderDate = false;
              }

              currentMonth = moment(journalPost.date);
              currentDay = moment(journalPost.date);

              if (journalPost.image) {
                ({ imageWidth, imageHeight } = getImageSize(journalPost.image.width, journalPost.image.height));
              }

              
              return (
                <View key={String(journalPost.id)}>
                  {(renderMonth && !lastOnly) &&
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={styles.month}>{moment(journalPost.date).format('MMMM')}</Text>
                    </View>
                  }
                  {renderDate && <Text style={styles.date}>{generateDate(journalPost.date)}</Text>}
                  <JournalItem
                    key={String(journalPost.id)}
                    id={journalPost.id || ''}
                  >
                    {renderData(journalPost)}
                    {journalPost.image &&
                      <ImageWrapper
                        uri={journalPost.image.uri}
                        width={imageWidth}
                        height={imageHeight}
                      />
                    }
                  </JournalItem>
                </View>
              );
            })}
          </>
        )
      }}
      keyExtractor={item => item[0]}
      ListFooterComponent={getFooter}
    />
  );
};
