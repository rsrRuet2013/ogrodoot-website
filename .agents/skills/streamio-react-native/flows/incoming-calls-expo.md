# Incoming Calls & Push Notifications (Expo)

This flow sets up incoming call notifications using Firebase Cloud Messaging (Android), Apple PushKit/VoIP (iOS), and CallKit integration.

> **Reference**: https://getstream.io/video/docs/react-native/incoming-calls/ringing-setup/expo/

---

## Step 1 — Add Push Provider Credentials to Stream

Before coding, configure your push providers in the [Stream Dashboard](https://dashboard.getstream.io/):

- **Android**: Follow the [Firebase Cloud Messaging guide](https://getstream.io/video/docs/react-native/incoming-calls/push-providers/firebase/)
- **iOS**: Follow the [Apple Push Notification Service (APNs) guide](https://getstream.io/video/docs/react-native/incoming-calls/push-providers/apn-voip/)

---

## Step 2 — Install Dependencies

```bash
npx expo install \
  @react-native-firebase/app \
  @react-native-firebase/messaging \
  @notifee/react-native \
  react-native-voip-push-notification \
  react-native-callkeep \
  @config-plugins/react-native-callkeep
```

### Package Purposes

| Package | Purpose |
| ------- | ------- |
| `@react-native-firebase/app`, `@react-native-firebase/messaging` | Handle Firebase Cloud Messaging on Android |
| `@notifee/react-native` | Customize and display push notifications |
| `react-native-voip-push-notification` | Handle PushKit VoIP notifications on iOS |
| `react-native-callkeep`, `@config-plugins/react-native-callkeep` | Report calls to iOS CallKit |

---

## Step 3 — Add Firebase Credentials

### Android

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add your Android app using the same `android.package` as in `app.json`.
3. Download `google-services.json` to your project root.
4. Add to `app.json`:

```json
{
  "android": {
    "googleServicesFile": "./google-services.json"
  }
}
```

### iOS

1. Add your Apple app using the same `ios.bundleIdentifier` as in `app.json`.
2. Download `GoogleService-Info.plist` to your project root.
3. Add to `app.json`:

```json
{
  "ios": {
    "googleServicesFile": "./GoogleService-Info.plist"
  }
}
```

> Firebase on iOS is needed for `react-native-firebase` setup, even though we use APNs/VoIP for actual iOS push delivery.

### iOS Notifications Entitlement

Ensure your `app.json` includes the push notification entitlement:

```json
{
  "ios": {
    "entitlements": {
      "aps-environment": "development"
    }
  }
}
```

Change to `"production"` for production builds.

---

## Step 4 — Add Config Plugins

Add the ringing-related config plugins to `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "@stream-io/video-react-native-sdk",
        {
          "ringingPushNotifications": {
            "disableVideoIos": false,
            "showWhenLockedAndroid": true
          }
        }
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/messaging",
      [
        "@config-plugins/react-native-callkeep",
        {
          "fakeConnectionService": true
        }
      ]
    ]
  }
}
```

> Set `showWhenLockedAndroid: true` to enable full-screen incoming call UI on locked Android devices (adds `USE_FULL_SCREEN_INTENT` permission).

---

## Step 5 — Create Firebase Message Handlers

Create a utility file (e.g., `utils/setFirebaseListeners.ts`):

```ts
// utils/setFirebaseListeners.ts
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";
import {
  isFirebaseStreamVideoMessage,
  firebaseDataHandler,
  onAndroidNotifeeEvent,
  isNotifeeStreamVideoEvent,
} from "@stream-io/video-react-native-sdk";

export const setFirebaseListeners = () => {
  // Background message handler
  messaging().setBackgroundMessageHandler(async (msg) => {
    if (isFirebaseStreamVideoMessage(msg)) {
      await firebaseDataHandler(msg.data);
    } else {
      // your other background notifications (if any)
    }
  });

  // Background notification press handlers
  notifee.onBackgroundEvent(async (event) => {
    if (isNotifeeStreamVideoEvent(event)) {
      await onAndroidNotifeeEvent({ event, isBackground: true });
    } else {
      // your other background notifications (if any)
    }
  });

  // Foreground message handler (optional)
  messaging().onMessage((msg) => {
    if (isFirebaseStreamVideoMessage(msg)) {
      firebaseDataHandler(msg.data);
    }
  });

  // Foreground notification press handlers (optional)
  notifee.onForegroundEvent((event) => {
    if (isNotifeeStreamVideoEvent(event)) {
      onAndroidNotifeeEvent({ event, isBackground: false });
    }
  });
};
```

> If you disabled Firebase on iOS, use platform-specific files: `setFirebaseListeners.android.ts` (with the code above) and `setFirebaseListeners.ts` (with an empty no-op function).

---

## Step 6 — Configure Push Notifications for the SDK

Create `utils/setPushConfig.ts`:

```ts
// utils/setPushConfig.ts
import {
  StreamVideoClient,
  StreamVideoRN,
  User,
} from "@stream-io/video-react-native-sdk";
import { AndroidImportance } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAM_API_KEY = "your-api-key";

export function setPushConfig() {
  StreamVideoRN.setPushConfig({
    isExpo: true,
    ios: {
      pushProviderName: __DEV__
        ? "apn-video-staging"
        : "apn-video-production",
    },
    android: {
      smallIcon: "ic_notification",
      pushProviderName: __DEV__
        ? "firebase-video-staging"
        : "firebase-video-production",
      incomingCallChannel: {
        id: "stream_incoming_call",
        name: "Incoming call notifications",
        importance: AndroidImportance.HIGH,
        // sound: "<url to custom ringtone>",
      },
      incomingCallNotificationTextGetters: {
        getTitle: (userName: string) => `Incoming call from ${userName}`,
        getBody: (_userName: string) => "Tap to answer the call",
        getAcceptButtonTitle: () => "Accept",
        getDeclineButtonTitle: () => "Decline",
      },
    },
    createStreamVideoClient: async () => {
      const userId = await AsyncStorage.getItem("@userId");
      const userName = await AsyncStorage.getItem("@userName");
      if (!userId) return undefined;

      const tokenProvider = async (): Promise<string> =>
        fetch(`https://your-api.com/stream-token?userId=${userId}`)
          .then((res) => res.json())
          .then((data) => data.token);

      const user: User = { id: userId, name: userName ?? undefined };
      return StreamVideoClient.getOrCreateInstance({
        apiKey: STREAM_API_KEY,
        user,
        tokenProvider,
      });
    },
  });
}
```

> Always use `StreamVideoClient.getOrCreateInstance()` — reusing the client instance preserves call accept/decline states from background.

> Set `android.smallIcon` for best results. Expo prebuild auto-generates `notification_icon.png` from the app icon. Custom icons should be 96×96 PNG grayscale with transparency.

---

## Step 7 — Initialize Outside the Application Cycle

Call configuration methods **outside** the application cycle to ensure they're available when the app opens from a push notification. In your entry point (e.g., `index.js`):

```ts
import "expo-router/entry";
import { setPushConfig } from "src/utils/setPushConfig";
import { setFirebaseListeners } from "src/utils/setFirebaseListeners";

setPushConfig();
setFirebaseListeners();
```

---

## Step 8 — Request Notification Permissions

```ts
import { requestNotifications } from "react-native-permissions";

// Request POST_NOTIFICATION runtime permission for Android 13+
await requestNotifications(["alert", "sound"]);
```

For a comprehensive guide, see [`flows/permissions.md`](permissions.md).

---

## Step 9 — Disable Push on Logout

Always disable push when the user logs out or switches accounts:

```ts
import { StreamVideoRN } from "@stream-io/video-react-native-sdk";

await StreamVideoRN.onPushLogout();
```

---

## ✅ Incoming Calls Setup Complete

Your app now handles incoming call push notifications on both Android and iOS. Proceed to:

1. **`flows/network-optimization.md`** — to handle network quality and disruptions.
