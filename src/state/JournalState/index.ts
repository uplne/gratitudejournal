import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { idType } from '../../types/idtype';

export enum JOURNAL_TYPES {
  'THREE_THINGS'= 'THREE_THINGS',
  'DEFAULT'= 'DEFAULT',
  'ONE_LINE'= 'ONE_LINE',
  'PROMPT'= 'PROMPT',
};

export enum JOURNAL_TYPES_HUMAN_READABLE {
  'THREE_THINGS'= '3 Positive Things',
  'DEFAULT'= 'Blank Page',
  'ONE_LINE'= 'One Line',
  'PROMPT'= 'With Prompt',
};

export type ImageType = {
  uri: string,
  width: number,
  height: number,
};

export type DataType = string | undefined | (undefined | string)[];
export type PromptType = string | null;

type ORDIAL_TYPES_TYPES = {
  [key in JOURNAL_TYPES]?: number
}

const ORDIAL_TYPES: ORDIAL_TYPES_TYPES = {
  [JOURNAL_TYPES.THREE_THINGS]: 1,
  [JOURNAL_TYPES.PROMPT]: 2,
  [JOURNAL_TYPES.ONE_LINE]: 3,
  [JOURNAL_TYPES.DEFAULT]: 4,
};

export type JournalTypes = {
  id?: idType | undefined,
  type: JOURNAL_TYPES,
  date: string,
  data: DataType,
  prompt?: PromptType,
  image: ImageType | null,
  ordial?: typeof ORDIAL_TYPES[keyof typeof ORDIAL_TYPES],
};

type JournalStateType = {
  journal: JournalTypes[],
  setNewJournal: (values: JournalTypes) => void,
  deleteJournal: (id: idType) => void,
  updateJournal: (id: idType, type: JOURNAL_TYPES, values: DataType, image: ImageType | null) => void,
  getData: () => void,
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@journal');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

const saveJournal = async (values: JournalTypes[]) => {
  try {
    const jsonValue = JSON.stringify(values);

    await AsyncStorage.setItem('@journal', jsonValue);
  } catch (e) {
    console.log('Saving error: ', e);
  }
}

export const useJournalStore = create<JournalStateType>((set, get) => ({
  journal: [],
  updateJournal: async (id:idType, type: JOURNAL_TYPES, values: DataType, image: ImageType | null) => {
    const journal: JournalTypes[] = get().journal;
    const journalToSave = journal.map((item:JournalTypes) => {
      if (item.id === id) {
        return {
          ...item,
          type,
          data: values,
          image,
        };
      }
  
      return item;
    });
    await saveJournal(journalToSave);
    set({ journal: journalToSave });
  },
  deleteJournal: async (id:idType) => {
    const journal: JournalTypes[] = get().journal;
    const journalToSave = journal.filter((item:JournalTypes) => item.id !== id);
    await saveJournal(journalToSave);
    set({ journal: journalToSave });
  },
  setNewJournal: async (item: JournalTypes) => {
    const journal: JournalTypes[] = get().journal;
    const newJournal:JournalTypes = {
      id: uuid.v4(),
      type: item.type,
      date: item.date,
      data: item.data,
      prompt: item.prompt,
      image: item.image,
      ordial: ORDIAL_TYPES[item.type] || 1,
    };
    const newJournalArray = [...journal, newJournal];
  
    await saveJournal(newJournalArray);
    set({ journal: newJournalArray });
  },
  getData: async () => {
    const data = await getData();
    set({ journal: data });
  }
}));