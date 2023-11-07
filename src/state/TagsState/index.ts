import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { idType } from '../../types/idtype';

export type TagTypes = {
  id: idType,
  tag: string,
};

export type TagStateType = {
  tags: TagTypes[],
  setNewTag: (value: string) => void,
  deleteTag: (id: idType) => void,
  updateTag: (id: idType, value: string) => void,
  getData: () => void,
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gratitude_journal_tags');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

const saveTags = async (values: TagTypes[]) => {
  try {
    const jsonValue = JSON.stringify(values);

    await AsyncStorage.setItem('@gratitude_journal_tags', jsonValue);
  } catch (e) {
    console.log('Saving error: ', e);
  }
}

export const useTagsStore = create<TagStateType>((set, get) => ({
  tags: [],
  updateTag: async (id:idType, value: string) => {
    const tags: TagTypes[] = get().tags;

    const tagsToSave = await Promise.all(tags.map(async (item:TagTypes) => {
      if (item.id === id) {
        return {
          ...item,
          tag: value,
        };
      }
  
      return item;
    }));
    await saveTags(tagsToSave);
    set({ tags: tagsToSave });
  },
  deleteTag: async (id:idType) => {
    const tags: TagTypes[] = get().tags;
    const tagsToSave = tags.filter((item:TagTypes) => item.id !== id);

    await saveTags(tagsToSave);
    set({ tags: tagsToSave });
  },
  setNewTag: async (value: string) => {
    const tags: TagTypes[] = get().tags;

    const newTags:TagTypes = {
      id: uuid.v4(),
      tag: value,
    };
    const newTagsArray = [...tags, newTags];
  
    await saveTags(newTagsArray);
    set({ tags: newTagsArray });
  },
  getData: async () => {
    const data = await getData();
    set({ tags: data });
  }
}));