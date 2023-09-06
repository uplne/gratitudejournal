import { useNavigation } from '@react-navigation/native';

import { useAppStartContext } from '../../context/AppStartContext';
import { StackNavigation } from '../../types/navigation-types';
import { useEffect } from 'react';

export const AppStart = () => {
  const { appStart } = useAppStartContext();
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    if (appStart && !appStart.alreadyLaunched) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home');
    }
  }, []);

  return null;
};
