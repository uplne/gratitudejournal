import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { idType } from '../../types/idtype';

export enum TierTypes {
  'FREE'= 'free',
  'SUBSCRIPTION'= 'subscription',
  'LIFETIME'= 'lifetime',
};

export type AppStateTypes = {
  alreadyLaunched: boolean,
  name: string,
  userID: idType | null,
  userHash: idType | null,
  tracking: boolean,
  tier: TierTypes,
  biometrics: boolean,
  biometricsAvailable: boolean,
  loggedIn: boolean,
};

type AppStateType = {
  appState: AppStateTypes,
  shouldLock: boolean,
  updateShouldLock: (value: boolean) => void,
  updateAppState: (values: Partial<AppStateTypes>) => void,
};

const appStateDefaultValues = {
  alreadyLaunched: false,
  name: '',
  userID: null,
  userHash: null,
  tracking: false,
  tier: TierTypes.FREE,
  biometrics: false,
  biometricsAvailable: false,
  loggedIn: false,
};

export const getAppData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gratitude_journal_appstate');
    const parsedJSONValue  = jsonValue != null ? JSON.parse(jsonValue) : {};

    return {
      ...appStateDefaultValues,
      ...parsedJSONValue,
    };
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

const saveAppState = async (values: Partial<AppStateTypes>) => {
  try {
    const jsonValue = JSON.stringify(values);

    await AsyncStorage.setItem('@gratitude_journal_appstate', jsonValue);
  } catch (e) {
    console.log('Saving error: ', e);
  }
};

export const useAppStateStore = create<AppStateType>((set, get) => ({
  appState: appStateDefaultValues,
  shouldLock: true,
  updateShouldLock: async (value: boolean) => {
    set({ shouldLock: value });
  },
  updateAppState: async (values:Partial<AppStateTypes>) => {
    const appStateValues: AppStateTypes = get().appState;
    await saveAppState({
      ...appStateValues,
      ...values,
    });
    set({ appState: {
      ...appStateValues,
      ...values,
    }});
  }
}));