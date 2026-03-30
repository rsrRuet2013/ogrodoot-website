# Native Permissions

This flow covers requesting and handling native device permissions required for video calling (camera, microphone, Bluetooth, notifications).

> **Reference**: https://getstream.io/video/docs/react-native/guides/native-permissions/

---

## Best Practices

- **Request at the right time** — Ask for permissions when users are about to use camera/microphone features, not at app launch.
- **Handle blocked permissions** — Prompt users to open device settings if permissions are permanently blocked.
- **Check status before use** — Verify permission status before showing camera/microphone UI.
- **Request Bluetooth on Android** — Include `BLUETOOTH_CONNECT` for headset/earphone support.

---

## Step 1 — Install react-native-permissions

```bash
npx expo install react-native-permissions
```

> Follow the additional setup steps for iOS mentioned in the [react-native-permissions library documentation](https://github.com/zoontek/react-native-permissions#ios).

---

## Step 2 — Create Permission Request Function

Create a utility function (e.g., `utils/permissions.ts`):

```ts
// utils/permissions.ts
import { Platform } from "react-native";
import {
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
} from "react-native-permissions";

export const requestCallPermissions = async () => {
  if (Platform.OS === "ios") {
    const results = await requestMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
    ]);
    return results;
  } else if (Platform.OS === "android") {
    const results = await requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ]);
    return results;
  }
};

export const requestNotificationPermissions = async () => {
  // Requests POST_NOTIFICATION runtime permission for Android 13+
  await requestNotifications(["alert", "sound"]);
};
```

---

## Step 3 — Use in Your Call Screen

Request permissions before the user enters a call:

```tsx
import { useEffect } from "react";
import { requestCallPermissions } from "../utils/permissions";

function PreCallScreen() {
  useEffect(() => {
    requestCallPermissions();
  }, []);

  return (
    // ... your pre-call UI (lobby, preview, etc.)
  );
}
```

---

## Step 4 — Handle Blocked Permissions

If the user has permanently denied a permission, direct them to the device settings:

```ts
import { Linking, Platform } from "react-native";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export const checkCameraPermission = async () => {
  const permission = Platform.OS === "ios"
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;

  const status = await check(permission);

  if (status === RESULTS.BLOCKED) {
    // Prompt user to open settings
    Linking.openSettings();
  }

  return status;
};
```

---

## ✅ Permissions Setup Complete

Your app now properly requests and handles native permissions. Proceed to:

1. **`flows/keeping-call-alive.md`** — to keep calls alive in the background.
2. **`flows/incoming-calls-expo.md`** — to set up incoming call push notifications.
