import { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Pressable } from "native-base";
import ActionSheet, { SheetProps, SheetManager } from "react-native-actions-sheet";
import { IconButton } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

import { useTagsStore } from '../../../state/TagsState';
import { useJournalEntryStore } from '../../../state/JournalEntryState';
import { ButtonNext } from '../../Buttons/ButtonNext';
import theme from '../../../styles/theme';
import { Tag } from '../../Tag';
import { TagsWrapper } from '../../TagsWrapper';
import { idType } from '../../../types/idtype';

import styles from './styles';

export const AddTag = (props: SheetProps<{ isCreating: boolean }>) => {
  const { tags, setNewTag } = useTagsStore();
  const hasTags = tags.length > 0;
  const isCreatingTag = props.payload?.isCreating;
  const { journalTags, updateJournalTags } = useJournalEntryStore();
  const [text, setText] = useState('');
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<idType[]>([]);

  useEffect(() => {
    if (isCreatingTag) {
      setTagInputVisible(true);
    }
  }, []);

  const saveTags = async () => {
    await updateJournalTags(selectedTags);
    await setSelectedTags([]);
    await SheetManager.hide("AddTag");
  };

  const onTagSelect = async (selectedId: idType) => {
    const tagsIndex = selectedTags.findIndex((item) => selectedId === item);

    // Add tag
    if (tagsIndex === -1) {
      await setSelectedTags([...selectedTags, selectedId]);
    } else {
      const newArray = [...selectedTags];
      newArray.splice(tagsIndex, 1);
      await setSelectedTags(newArray);
    }
  };

  const createNewTag = async () => {
    await setText('');
    await setTagInputVisible(!tagInputVisible);
  };

  const saveNewTag = async () => {
    await setNewTag(text);
    await setTagInputVisible(false);

    if (isCreatingTag) {
      await SheetManager.hide("AddTag");
    }
  };

  useEffect(() => {
    setSelectedTags(journalTags);
  }, []);

  return (
    <ActionSheet id={props.sheetId}>
      <View style={styles.root}>
      {!isCreatingTag &&
        <>
          <Text style={styles.title}>Select Tags:</Text>
          <IconButton
            icon='close'
            style={styles.iconButton}
            onPress={() => SheetManager.hide("AddTag")}
          />
          <TagsWrapper>
            {hasTags && tags.map((tag) => {
              let isSelected = !!selectedTags.find((id) => id === tag.id);

              return (
                <Pressable
                  onPress={() => onTagSelect(tag.id)}
                >
                  <Tag
                    selected={isSelected}
                  >{tag.tag}</Tag>
                </Pressable>
              );
            })}
            <Pressable
              onPress={createNewTag}
            >
              <Tag
                simple
              >
                <Entypo style={styles.plusIcon} name="plus" size={21} color="rgba(0,0,0,.3)" />
              </Tag>
            </Pressable>
          </TagsWrapper>
          {!hasTags &&
            <View>
              <Text>You have no tags yet.</Text>
            </View>
          }
          </>
        }
        {tagInputVisible &&
          <View style={styles.createWrapper}>
            <Text style={styles.createNewTagTitle}>Create New Tag:</Text>
            <View style={styles.createFormWrapper}>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={text}
                  onChangeText={setText}
                  style={styles.textArea}
                />
              </View>
              <Pressable
                style={styles.createButton}
                onPress={saveNewTag}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        }
        {!isCreatingTag &&
          <View style={styles.bottom}>
            <ButtonNext
              style={{ backgroundColor: theme.colorPrimary }}
              onPress={saveTags}
            >
              Save
            </ButtonNext>
          </View>
        }
      </View>
    </ActionSheet>
  );
};
