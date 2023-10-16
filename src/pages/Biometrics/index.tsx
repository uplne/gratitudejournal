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

  const onPressHandler = async () => {
    if (appState.biometrics) {
      TrackingEvent('My Account', { "Biometrics": 'Turn Off'});
      updateAppState({
        biometrics: false,
      });
    } else {
      TrackingEvent('My Account', { "Biometrics": 'Turn On'});
      updateAppState({
        biometrics: true,
      });
    }

    showMessage({
      message: MESSAGES.CHANGES_SAVED,
      type: 'success',
      backgroundColor: theme.colorSecondary,
    });
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
