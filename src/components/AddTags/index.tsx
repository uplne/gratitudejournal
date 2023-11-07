import { useEffect } from 'react';
import { Pressable } from "native-base";
import { View, Text } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

import { useTagsStore } from '../../state/TagsState';
import { useJournalEntryStore } from '../../state/JournalEntryState';
import { TagsWrapper } from '../TagsWrapper';

import styles from './styles';

export const AddTags = () => {
  const { tags, getData } = useTagsStore();
  const { journalTags } = useJournalEntryStore();
  const hasTags = journalTags.length > 0;

  useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  const addTag = () => {
    SheetManager.show("AddTag");
  };

  const ButtonCopy = hasTags ? 'Edit Tags' : 'Add Tags';

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>Tags:</Text>
        {hasTags &&
          <TagsWrapper>
            {journalTags.map((id) => {
              const tag = tags.filter((item) => item.id === id)[0];

              return (
                <View style={styles.tag}>
                  <Text>{tag?.tag}</Text>
                </View>
              )
            })}
          </TagsWrapper>
        }
        <Pressable
          style={styles.button}
          onPress={addTag}
        >
          <Text>{ButtonCopy}</Text>
        </Pressable>
      </View>
    </View>
  );
};
