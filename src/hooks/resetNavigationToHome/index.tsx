import { useNavigation, CommonActions } from '@react-navigation/native';

import { StackNavigation } from '../../types/navigation-types';

export const resetNavigationToHome = () => {
  const navigation = useNavigation<StackNavigation>();

  const resetToHome = () => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Home' },
      ]
    }));
  };

  return { resetToHome };
};