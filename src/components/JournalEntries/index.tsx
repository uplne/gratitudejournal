import { useEffect } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import moment from 'moment';
import {
  flow,
  groupBy,
  toPairs,
  sortBy,
  reverse,
  slice,
} from 'lodash/fp';

import { useJournalStore, JournalTypes, JournalStateType } from '../../state/JournalState';
import { JournalItem } from '../JournalItem';
import { getImageSize } from '../../services/ImageSize';
import { ImageThumbnails } from '../ImageThumbnails';
import { Default } from './Entries/Default';
import { JOURNAL_TYPES_HUMAN_READABLE } from '../../state/JournalState';
import { ShowDate } from '../ShowDate';

import emptyJournal from '../../../assets/bgs/empty_journal2.png';

import styles from './styles';

const journalSelector = (state: JournalStateType)  => flow(
  groupBy('date'),
  toPairs,
  sortBy(0),
  reverse,
  slice(0, state.numberLoaded)
)(state.journal);

export const JournalEntries = () => {
  const journal = useJournalStore(journalSelector);
  const { getData, increaseNumberLoaded } = useJournalStore();
  const hasJournal = journal.length > 0;
  let currentMonth = moment(new Date());
  let currentDay: moment.Moment | null = null;

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

  let renderMonth = false;

  const loadMode = async () => {
    await increaseNumberLoaded();
  };

  return (
    <FlatList
      style={styles.root}
      data={journal}
      renderItem={({ item }: any) => {
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
                  {(renderMonth) &&
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
                    {journalPost.id &&
                      <ImageThumbnails
                        journalId={journalPost.id}
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
      keyExtractor={(item:any) => item[0]}
      onEndReached={loadMode}
      onEndReachedThreshold={0.6}
      ListFooterComponent={getFooter}
    />
  );
};
