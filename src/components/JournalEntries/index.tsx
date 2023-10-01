import { useEffect } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import moment from 'moment';
import {
  flow,
  groupBy,
  toPairs,
  sortBy,
  first,
  reverse,
} from 'lodash/fp';

import { useJournalStore, JournalTypes } from '../../state/JournalState';
import { JournalItem } from '../JournalItem';
import { getImageSize } from '../../services/ImageSize';
import { ImageWrapper } from '../ImageWrapper';
import { Default } from './Entries/Default';
import { JOURNAL_TYPES_HUMAN_READABLE } from '../../state/JournalState';
import { ShowDate } from '../ShowDate';

import emptyJournal from '../../../assets/bgs/empty_journal2.png';

import styles from './styles';

type Props = {
  lastOnly?: boolean,
};

export const JournalEntries = ({
  lastOnly = false,
}: Props) => {
  const { getData, journal } = useJournalStore();
  const hasJournal = journal.length > 0;
  let currentMonth = moment(new Date());
  let currentDay: moment.Moment | null = null;

  console.log(journal);

  useEffect(() => {
    getData();
  }, []);

  const renderData = (post:JournalTypes) => <Default data={post} />;

  const getFooter = () => <View style={styles.footer} />;

  if (!hasJournal) {
    return (
      <View style={styles.empty}>
        <ImageBackground source={emptyJournal} style={styles.emptyImage} />
        <Text style={styles.emptyText}>The beauty of journaling lies in its freedom - the freedom to be completely honest, raw, and unfiltered.</Text>
      </View>
    );
  }

  const groupGratitude = () => {
    let result = flow(
      groupBy('date'),
      toPairs,
      sortBy(2),
      reverse,
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
                  {renderDate && <ShowDate date={journalPost.date} small />}
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
                    <Text style={styles.journalType}>{JOURNAL_TYPES_HUMAN_READABLE[journalPost.type]}</Text>
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
