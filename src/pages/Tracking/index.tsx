import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { enableTracking, disableTracking } from 'vexo-analytics';
import { showMessage } from "react-native-flash-message";

import { ContainerWithHeader } from '../../components/ContainerWithHeader';
import { useAppStateStore } from '../../state/AppStartState';
import theme from '../../styles/theme';
import { TrackingEvent } from '../../services/Tracking';
import { MESSAGES } from '../../state/messages';

import styles from './styles';

export const Tracking = () => {
  const appState = useAppStateStore((state) => state.appState);
  const updateAppStart = useAppStateStore((state) => state.updateAppStart);

  const onPressHandler = async () => {
    if (appState.tracking) {
      TrackingEvent('My Account', { "Tracking": 'Opt Out'});
      updateAppStart({
        tracking: false,
      });
      await disableTracking();
    } else {
      TrackingEvent('My Account', { "Tracking": 'Opt In'});
      updateAppStart({
        tracking: true,
      });
      await enableTracking();
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
