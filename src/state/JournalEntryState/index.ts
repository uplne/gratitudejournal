import { create } from 'zustand';

import { ImageType } from '../JournalState';
import { idType } from '../../types/idtype';

export type ContentType = string | string[];

type JournalStateType = {
  journalEditedText: ContentType,
  updateJournalEditedText: (text: ContentType) => void,
  journalEditedImages: ImageType[],
  addJournalEditedImages: (images: ImageType[]) => void,
  removeJournalEditedImages: (imageId: idType) => void,
  resetJournalEditedImages: () => void,
  journalTags: idType[],
  updateJournalTags: (tags:idType[]) => void,
};

export const useJournalEntryStore = create<JournalStateType>((set, get) => ({
  journalEditedText: '',
  updateJournalEditedText: async (text: ContentType) => {
    set({ journalEditedText: text });
  },
  journalEditedImages: [],
  resetJournalEditedImages: async () => {
    set({ journalEditedImages: [] });
  },
  addJournalEditedImages: async (images: ImageType[]) => {
    const journalEditedImages: ImageType[] = get().journalEditedImages;
    set({ journalEditedImages: [...journalEditedImages, ...images] });
  },
  removeJournalEditedImages: async (imageId: idType) => {
    const journalEditedImages: ImageType[] = get().journalEditedImages;
    set({ journalEditedImages: journalEditedImages.filter((item) => item && item.id !== imageId) });
  },
  journalTags: [],
  updateJournalTags: async (tags: idType[]) => {
    set({ journalTags: tags });
  },
}));