import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";

export enum TierTypes {
  'FREE'= 'free',
  'SUBSCRIPTION'= 'subscription',
  'LIFETIME'= 'lifetime',
};

export type AppStartTypes = {
  alreadyLaunched: boolean,
  name: string,
  tracking: boolean,
  tier: TierTypes,
};

type AppStartContextType = {
  appStart: AppStartTypes,
  updateAppStart: (values: Partial<AppStartTypes>) => void,
};

const appStartDefaultValues = {
  alreadyLaunched: false,
  name: '',
  tracking: true,
  tier: TierTypes.FREE,
};

export const AppStartContext = createContext<AppStartContextType>({
  appStart: appStartDefaultValues,
  updateAppStart: () => null,
});

export const useAppStartContext = () => {
  const context = useContext(AppStartContext);

  if (context === undefined) {
    throw new Error(`useContext must be used within a Provider`);
  }

  return context;
}

type ComponentProps = {
  data: AppStartTypes | null,
  children: React.ReactNode,
};

export const getAppData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@appstart');
    const parsedJSONValue  = jsonValue != null ? JSON.parse(jsonValue) : {};

    return {
      ...appStartDefaultValues,
      ...parsedJSONValue,
    };
  } catch(e) {
    console.log('Reading error: ', e);
  }
};

export const AppStartContextComponent = ({ data, children }:ComponentProps) => {
  const [appStart, setAppStart] = useState<AppStartTypes>({
    ...appStartDefaultValues,
    ...data,
  });

  const saveAppStart = async (values: Partial<AppStartTypes>) => {
    try {
      const jsonValue = JSON.stringify(values);

      await AsyncStorage.setItem('@appstart', jsonValue);
      setAppStart({
        ...appStart,
        ...values,
      });
    } catch (e) {
      console.log('Saving error: ', e);
    }
  }

  const updateAppStart = async (obj:Partial<AppStartTypes>) => {
    await saveAppStart({
      ...appStart,
      ...obj,
    });
  };

  useEffect(() => {
    // AsyncStorage.clear();
    // Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  return (
    <AppStartContext.Provider
      value={{
        appStart,
        updateAppStart,
      }}
    >
      {children}
    </AppStartContext.Provider>
  );
};

