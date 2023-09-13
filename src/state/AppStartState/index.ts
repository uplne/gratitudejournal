import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum TierTypes {
  'FREE'= 'free',
  'SUBSCRIPTION'= 'subscription',
  'LIFETIME'= 'lifetime',
};

export type AppStateTypes = {
  alreadyLaunched: boolean,
  name: string,
  tracking: boolean,
  tier: TierTypes,
};

type AppStateType = {
  appState: AppStateTypes,
  updateAppStart: (values: Partial<AppStateTypes>) => void,
};

const appStateDefaultValues = {
  alreadyLaunched: false,
  name: '',
  tracking: true,
  tier: TierTypes.FREE,
};

export const getAppData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@appstart');
    const parsedJSONValue  = jsonValue != null ? JSON.parse(jsonValue) : {};

    return {
      ...appStateDefaultValues,
      ...parsedJSONValue,
    };
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

const saveAppStart = async (values: Partial<AppStateTypes>) => {
  try {
    const jsonValue = JSON.stringify(values);

    await AsyncStorage.setItem('@appstate', jsonValue);
  } catch (e) {
    console.log('Saving error: ', e);
  }
};

const updateAppStart = async (values:Partial<AppStateTypes>, state: AppStateTypes) => {
  await saveAppStart({
    ...state,
    ...values,
  });
};

export const useAppStateStore = create<AppStateType>((set, get) => ({
  appState: appStateDefaultValues,
  updateAppStart: async (values:Partial<AppStateTypes>) => {
    const appStateValues: AppStateTypes = get().appState;
    await updateAppStart(values, appStateValues);
    set({ appState: {
      ...appStateValues,
      ...values,
    }});
  }
}));