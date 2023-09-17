const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  "name": IS_DEV ? "Gratitude Journal (Dev)" : "Gratitude Journal",
  "slug": "gratitude-journal",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash_final.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "notification": {
    "icon": "./assets/icon.png",
    "color": "#fff"
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/icon.png",
      "backgroundColor": "#ffffff"
    },
    "package": IS_DEV ? "com.planmylife.dailyupliftdailyaffirmations.dev" : "com.planmylife.dailyupliftdailyaffirmations",
    "versionCode": 6
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "extra": {
    "eas": {
      "projectId": "3240c89a-1ba5-43d3-ae1b-8323bc04c4e0"
    }
  },
  "plugins": [
    [
      "expo-notifications",
      {
        "icon": "./assets/icon.png",
        "color": "#ffffff",
        "sounds": [],
        "androidMode": "default",
        "androidCollapsedTitle": "Daily Uplift",
        "iosDisplayInForeground": true
      }
    ],
    [
      "expo-image-picker",
      {
        "photosPermission": "The app accesses your photos to add them in your journals."
      }
    ]
  ],
  "owner": "planmylife"
};