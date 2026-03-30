# Keeping The Call Alive In Background

This flow configures the app to keep video/audio calls running when the app goes to the background or the screen is locked.

> **Reference**: https://getstream.io/video/docs/react-native/guides/keeping-call-alive/

---

## Android Setup

Android uses a [foreground service](https://developer.android.com/guide/components/foreground-services) to keep calls alive. The SDK manages the foreground service automatically.

### Step 1 — Install Notifee

```bash
npx expo install @notifee/react-native
```

> Notifee version 9 or above is required.

### Step 2 — Enable Keep Call Alive Plugin

In `app.json`, enable the `androidKeepCallAlive` property in the `@stream-io/video-react-native-sdk` plugin:

```json
{
  "plugins": [
    [
      "@stream-io/video-react-native-sdk",
      {
        "androidKeepCallAlive": true
      }
    ]
  ]
}
```

This automatically adds the required foreground service declarations to `AndroidManifest.xml`:
- `android.permission.FOREGROUND_SERVICE`
- `android.permission.FOREGROUND_SERVICE_CAMERA`
- `android.permission.FOREGROUND_SERVICE_MICROPHONE`
- `android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK`

### Step 3 — Prebuild

If not using EAS Build:

```bash
npx expo prebuild --clean
```

### Step 4 — Request Notification Permissions

Notification permissions are required for Android 13+ foreground services. See [`flows/permissions.md`](permissions.md) for how to request them.

### Play Store Declaration

When uploading to the Play Store, you **must** declare the foreground service permissions in the Play Console and provide an explanation (including a video demo of the call feature). This is a one-time requirement.

---

## iOS Setup

Enable the `audio` background mode to keep audio alive when users lock their device or switch apps.

### Option A — Via `app.json` (Expo Config Plugin)

Add `audio` to `UIBackgroundModes` via the `infoPlist` config:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "UIBackgroundModes": ["audio"]
      }
    }
  }
}
```

### Option B — Via Xcode

In Xcode, add `audio` to `UIBackgroundModes` in `Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
</array>
```

---

## ✅ Background Call Support Complete

Your app now keeps calls alive when backgrounded. Proceed to:

1. **`flows/incoming-calls-expo.md`** — to handle incoming call push notifications.
