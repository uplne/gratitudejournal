import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

export const InitSentry = async () => {
  Sentry.init({
    dsn: 'https://2e43166a1b4420747d5aa4fd60ffb37c@o4506280327053312.ingest.sentry.io/4506280328757248',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    integrations: [
      new Sentry.Native.ReactNativeTracing({
          shouldCreateSpanForRequest: (url) => {
              const shouldTrack = !__DEV__ || !url.startsWith(`http://${Constants.expoConfig?.hostUri}/logs`);
              return shouldTrack;
          }
      })
  ]
  });
};