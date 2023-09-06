import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { sortBy } from 'lodash/fp';

import { idType } from '../../types/idtype';

export enum JOURNAL_TYPES {
  'THREE_THINGS'= 'THREE_THINGS',
  'RANDOM'= 'RANDOM',
  'BLANK'= 'BLANK',
};

export type ImageType = {
  uri: string,
  width: number,
  height: number,
};

export type DataType = string | string[];
export type PromptType = string | null;

type ORDIAL_TYPES_TYPES = {
  [key in JOURNAL_TYPES]?: number
}

const ORDIAL_TYPES: ORDIAL_TYPES_TYPES = {
  [JOURNAL_TYPES.THREE_THINGS]: 1,
  [JOURNAL_TYPES.RANDOM]: 2,
  [JOURNAL_TYPES.BLANK]: 3,
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

type JournalContextType = {
  journal: JournalTypes[],
  setNewJournal: (values: JournalTypes) => void,
  deleteJournal: (id: idType) => void,
  updateJournal: (id: idType, type: JOURNAL_TYPES, values: DataType, image: ImageType | null) => void,
};

export const JournalContext = createContext<JournalContextType>({
  journal: [],
  setNewJournal: () => null,
  deleteJournal: () => null,
  updateJournal: () => null,
});

export const useJournalContext = () => {
  const context = useContext(JournalContext);

  if (context === undefined) {
    throw new Error(`useContext must be used within a Provider`);
  }

  return context;
}

type ComponentProps = {
  children: React.ReactNode,
};

export const JournalContextComponent = ({ children }:ComponentProps) => {
  const [journal, setJournal] = useState<JournalTypes[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@journal');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      console.log('Reading error: ', e);
    }
  };

  const storeJournal = async ({
    type,
    date,
    data,
    prompt,
    image,
  }:JournalTypes) => {
    const newJournal:JournalTypes = {
      id: uuid.v4(),
      type,
      date,
      data,
      prompt,
      image,
      ordial: ORDIAL_TYPES[type] || 1,
    };
    const newJournalArray = [...journal, newJournal];

    console.log('Save: ', newJournalArray);

    await saveJournal(newJournalArray);
  };

  const saveJournal = async (values: JournalTypes[]) => {
    try {
      const jsonValue = JSON.stringify(values);

      await AsyncStorage.setItem('@journal', jsonValue);
      setJournal(values);
    } catch (e) {
      console.log('Saving error: ', e);
    }
  }

  const deleteJournal = async (id:idType) => {
    const journalToSave = journal.filter((item:JournalTypes) => item.id !== id);
    await saveJournal(journalToSave);
  };

  const updateJournal= async (id:idType, type: JOURNAL_TYPES, values: DataType, image: ImageType | null) => {
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
  };

  useEffect(() => {
    async function fetchDataFromStorage() {
      const data = await getData();
      setJournal(data);
    };

    fetchDataFromStorage();
  }, []);

  return (
    <JournalContext.Provider
      value={{
        journal: sortBy('date', journal).reverse(),
        setNewJournal: async (value) => {
          console.log('setNewJournal: ', value);
          await storeJournal(value);
        },
        updateJournal,
        deleteJournal,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

