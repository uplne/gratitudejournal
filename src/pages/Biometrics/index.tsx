import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useAppStateStore } from '../../state/AppState';
import theme from '../../styles/theme';
import { TrackingEvent } from '../../services/Tracking';
import { MESSAGES } from '../../state/messages';

import styles from './styles';

export const Biometrics = () => {
  const appState = useAppStateStore((state) => state.appState);
  const updateAppState = useAppStateStore((state) => state.updateAppState);
  const updateShouldLock = useAppStateStore((state) => state.updateShouldLock);

  const onPressHandler = async () => {
    await updateShouldLock(false);

    if (appState.biometrics) {
      await TrackingEvent('My Account', { "Biometrics": 'Turn Off'});
      await updateAppState({
        biometrics: false,
      });
    } else {
      await TrackingEvent('My Account', { "Biometrics": 'Turn On'});
      await updateAppState({
        biometrics: true,
      });
    }

    showMessage({
      message: MESSAGES.CHANGES_SAVED,
      type: 'success',
      backgroundColor: theme.colorSecondary,
    });

    await updateShouldLock(true);
  };

  return (
    <ContainerWithHeader
      title="Touch/Face ID Lock"
      pageText="Lock your journal for further privacy (if supported by your device)."
    >
      <View style={styles.root}>
        <Text style={styles.text}>Touch/Face ID Lock</Text>
        <Switch
          value={appState.biometrics}
          onValueChange={onPressHandler}
          color={theme.colorPrimary}
        />
      </View>
    </ContainerWithHeader>
  );
};
