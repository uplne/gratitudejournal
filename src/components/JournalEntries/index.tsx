import { useEffect } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
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
import { ImageThumbnails } from '../ImageThumbnails';
import { Default } from './Entries/Default';
import { JOURNAL_TYPES_HUMAN_READABLE } from '../../state/JournalState';
import { ShowDate } from '../ShowDate';

import emptyJournal from '../../../assets/bgs/empty_journal2.png';

import styles from './styles';

const journalSelector = (state: JournalStateType)  => flow(
  groupBy((item:JournalTypes) => moment(item.date).format('YYYY-MM-DD')),
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

  // console.log(journal[0][1])

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
                    {(journalPost?.tags && journalPost?.tags.length > 0) &&
                      <View style={styles.journalTags}>
                        <AntDesign name="tagso" size={20} color="#acacaa" />
                        <Text style={styles.tagsText}>{journalPost?.tags.length}</Text>
                      </View>
                    }
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
