import Constants, { ExecutionEnvironment } from "expo-constants";
// import { vexo, customEvent } from 'vexo-analytics';

let Vexo:any = null;

const isInProduction = true; //Constants.executionEnvironment === ExecutionEnvironment.Standalone;

if (isInProduction) {
  Vexo = require('vexo-analytics');
}

export const InitTracking = () => {
  if (isInProduction) {
    Vexo.vexo('c986c684-f36f-4b8e-bbd9-b1539439133d');
  }
}

export const TrackingEvent = (eventTitle: string, eventObject: Record<string, string>) => {
  if (isInProduction) {
    Vexo.customEvent(eventTitle, eventObject);
  }
};