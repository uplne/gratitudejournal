import Constants, { ExecutionEnvironment } from "expo-constants";
import analytics from '@react-native-firebase/analytics';

const isInProduction = true; //Constants.executionEnvironment === ExecutionEnvironment.Standalone;

export const InitTracking = async () => {
  await analytics().logEvent("test_analytics_event", {
    additionaParam: "test",
  });
}

export const TrackingEvent = async (eventTitle: string, eventObject: Record<string, string>) => {
  if (isInProduction) {
    await analytics().logEvent("some_event", eventObject);
  }
};