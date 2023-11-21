import Constants, { ExecutionEnvironment } from "expo-constants";
// import { vexo, customEvent } from 'vexo-analytics';
import auth from '@react-native-firebase/app';

const isInProduction = true; //Constants.executionEnvironment === ExecutionEnvironment.Standalone;

export const InitTracking = async () => {
  // setTimeout(async () => {
  //   console.log('INIT TRACKIING: ', vexo);
  //   if (isInProduction) {
  //     await vexo('c986c684-f36f-4b8e-bbd9-b1539439133d');
  //   }
  // }, 5000);
}

export const TrackingEvent = (eventTitle: string, eventObject: Record<string, string>) => {
  if (isInProduction) {
    // customEvent(eventTitle, eventObject);
  }
};