import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useAppStateStore } from '../../state/AppState';
import theme from '../../styles/theme';
import { TrackingEvent } from '../../services/Tracking';
import { MESSAGES } from '../../state/messages';

import styles from './styles';

export const Tracking = () => {
  const appState = useAppStateStore((state) => state.appState);
  const updateAppState = useAppStateStore((state) => state.updateAppState);

  const onPressHandler = async () => {
    if (appState.tracking) {
      TrackingEvent('My Account', { "Tracking": 'Opt Out'});
      updateAppState({
        tracking: false,
      });
      // await disableTracking();
    } else {
      TrackingEvent('My Account', { "Tracking": 'Opt In'});
      updateAppState({
        tracking: true,
      });
      // await enableTracking();
    }

    showMessage({
      message: MESSAGES.CHANGES_SAVED,
      type: 'success',
      backgroundColor: theme.colorSecondary,
    });
  };

  return (
    <ContainerWithHeader
      title="Tracking"
    >
      <View style={styles.root}>
        <Text style={styles.text}>Tracking Opt In/Out</Text>
        <Switch
          value={appState.tracking}
          onValueChange={onPressHandler}
          color={theme.colorPrimary}
        />
      </View>
    </ContainerWithHeader>
  );
};
