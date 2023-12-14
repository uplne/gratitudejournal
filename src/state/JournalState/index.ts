import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import CryptoES from 'crypto-es';

import { TagTypes } from '../TagsState';
import { useJournalEntryStore } from '../JournalEntryState';
import { useAppStateStore } from '../AppState';

import { idType } from '../../types/idtype';

const NUMBER_LOADING = 3;

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

export type ImageType = MediaLibrary.Asset;

export const PHOTOS_FOLDER = `${FileSystem.documentDirectory || ''}gratitudejournal_photos`;

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
  images: MediaLibrary.Asset[],
  tags?: idType[],
  ordial?: typeof ORDIAL_TYPES[keyof typeof ORDIAL_TYPES],
};

export type JournalStateType = {
  journal: JournalTypes[],
  numberLoaded: number,
  increaseNumberLoaded: () => void,
  setNewJournal: (values: JournalTypes) => void,
  deleteJournal: (id: idType) => void,
  updateJournal: (id: idType, type: JOURNAL_TYPES, values: DataType, images: ImageType[]) => void,
  getData: () => void,
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gratitude_journal_journal');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

const saveJournal = async (values: JournalTypes[]) => {
  try {
    const jsonValue = JSON.stringify(values);

    await AsyncStorage.setItem('@gratitude_journal_journal', jsonValue);
  } catch (e) {
    console.log('Saving error: ', e);
  }
};

export const encryptData = async (data: DataType, userHash: idType | null) => {
  if (!userHash) {
    return data;
  }

  if (data === '' || data === null) {
    return null;
  }

  if (typeof data === 'string') {
    return `encrypted_${CryptoES.AES.encrypt(data, userHash.toString())}`;
  }

  if (Array.isArray(data)) {
    const newArray = [...data];
    newArray.forEach((item, index) => {

      if (item === '' || item === null) {
        return null;
      }
      
      newArray[index] = `encrypted_${CryptoES.AES.encrypt(item || '', userHash.toString())}`;
    });

    return newArray;
  }
};

export const decryptData = (data: DataType, userHash: idType | null) => {
  if (!userHash) {
    return data;
  }

  if (typeof data === 'string') {
    const isEncrypted = data.match(/^encrypted_/);

    if (isEncrypted) {
      const newText = data.replace(/^encrypted_/, '');
      const decrypted = CryptoES.AES.decrypt(newText.toString(), userHash.toString());
      const result = decrypted.toString(CryptoES.enc.Utf8);
      return result;
    }

    return data;
  }

  if (Array.isArray(data)) {
    const newArray = [...data];

    newArray.forEach((item, index) => {
      const isEncrypted = item?.match(/^encrypted_/);

      if (isEncrypted) {
        const newText = item?.replace(/^encrypted_/, '') || '';
        const decrypted = CryptoES.AES.decrypt(newText.toString(), userHash.toString());
        newArray[index] = decrypted.toString(CryptoES.enc.Utf8);
      }
    });

    return newArray;
  }
};

export const useJournalStore = create<JournalStateType>((set, get) => ({
  journal: [],
  numberLoaded: NUMBER_LOADING,
  increaseNumberLoaded: async () => {
    const numberLoaded = get().numberLoaded;
    set({ numberLoaded: numberLoaded + NUMBER_LOADING });
  },
  updateJournal: async (id:idType, type: JOURNAL_TYPES, values: DataType, images: ImageType[]) => {
    const journal: JournalTypes[] = get().journal;
    const appState = useAppStateStore.getState().appState;
    const tags: TagTypes[] = useJournalEntryStore.getState().journalTags;

    const imagesMap = async (item: JournalTypes) => {
      let tempImages:ImageType[] = [];

      // Go through the new images
      await Promise.all(images.map(async (image) => {
        // Find if image is the same as we already have. If yes, just move it in temp array.
        if (item.images.find((img) => img.id === image.id)) {
          tempImages.push(image);

        // If not, move the image and add it to the temp array.
        } else {
          const key = uuid.v4();
          const newUri = `${PHOTOS_FOLDER}/${key}.jpg`;
          await FileSystem.copyAsync({ from: image.uri, to: newUri });
          tempImages.push({
            ...image,
            uri: newUri,
          });
        }
      }));

      // Now go through the current images again and delete ones that are not in the temp Array
      await Promise.all(item.images.map(async (image) => {
        if (!tempImages.find((img) => img.id === image.id)) {
          await FileSystem.deleteAsync(image.uri);
        }
      }));

      return tempImages;
    };

    const journalToSave = await Promise.all(journal.map(async (item:JournalTypes) => {
      if (item.id === id) {
        const updatedImages = await imagesMap(item);
        return {
          ...item,
          type,
          data: await encryptData(values, appState.userHash),
          tags,
          images: updatedImages,
        };
      }
  
      return item;
    }));
    await saveJournal(journalToSave);
    set({ journal: journalToSave });
  },
  deleteJournal: async (id:idType) => {
    const journal: JournalTypes[] = get().journal;
    const journalToRemove = journal.filter((item:JournalTypes) => item.id === id)[0];
    const journalToSave = journal.filter((item:JournalTypes) => item.id !== id);

    journalToRemove?.images.forEach(async (image) => {
      await FileSystem.deleteAsync(image.uri);
    });

    await saveJournal(journalToSave);
    set({ journal: journalToSave });
  },
  setNewJournal: async (item: JournalTypes) => {
    const journal: JournalTypes[] = get().journal;
    const tags: idType[] = useJournalEntryStore.getState().journalTags;
    const appState = useAppStateStore.getState().appState;
    const imagesMap = await Promise.all([...item.images].map(async (image) => {
      const key = uuid.v4();
      const newUri = `${PHOTOS_FOLDER}/${key}.jpg`;
      await FileSystem.copyAsync({ from: image.uri, to: newUri });

      return {
        ...image,
        uri: newUri,
      };
    }));

    const newJournal:JournalTypes = {
      id: uuid.v4(),
      type: item.type,
      date: item.date,
      data: await encryptData(item.data, appState.userHash),
      prompt: item.prompt,
      images: imagesMap,
      tags, 
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