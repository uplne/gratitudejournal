import { useNavigation } from '@react-navigation/native';

import { useAppStateStore } from '../../state/AppStartState';
import { StackNavigation } from '../../types/navigation-types';
import { useEffect } from 'react';

export const AppStart = () => {
  const navigation = useNavigation<StackNavigation>();
  const appState = useAppStateStore((state) => state.appState);

  console.log(appState);

  useEffect(() => {
    console.log('appstarted mounted');
    if (appState && !appState.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  }, []);

  return null;
};
