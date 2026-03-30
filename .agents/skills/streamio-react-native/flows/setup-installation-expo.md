# Setup & Installation (Expo)

This flow is **mandatory** for every project. It installs the Stream.io Video SDK and all required dependencies for the Expo environment.

> **Reference**: https://getstream.io/video/docs/react-native/setup/installation/expo/

---

## Step 1 — Install SDK & Dependencies

```bash
npx expo install @stream-io/video-react-native-sdk \
  @stream-io/react-native-webrtc \
  @config-plugins/react-native-webrtc \
  react-native-svg \
  @react-native-community/netinfo \
  expo-build-properties
```

### Installed packages

| Package | Purpose |
| ------- | ------- |
| `@stream-io/video-react-native-sdk` | Stream's Video SDK with UI components, hooks, and utilities |
| `@stream-io/react-native-webrtc` | WebRTC module for rendering audio/video tracks and media device interaction |
| `@config-plugins/react-native-webrtc` | Config plugin for auto-configuring WebRTC on `npx expo prebuild` |
| `react-native-svg` | SVG support for SDK components and icons |
| `@react-native-community/netinfo` | Detects device connectivity state, type, and quality |
| `expo-build-properties` | Config plugin for native build properties |

> Starting from version `125.3.0` of `@stream-io/react-native-webrtc`, only Expo version 50 and above is supported. If on an older Expo version, use `125.2.1`.

---

## Step 2 — Android: Set Minimum SDK Version

In your `app.json`, add `expo-build-properties` to the plugins with the required `minSdkVersion`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 24
          }
        }
      ]
    ]
  }
}
```

---

## Step 3 — Add Config Plugins

Add the config plugins for `@stream-io/video-react-native-sdk` and `react-native-webrtc` to `app.json`:

```json
{
  "expo": {
    "plugins": [
      "@stream-io/video-react-native-sdk",
      [
        "@config-plugins/react-native-webrtc",
        {
          "cameraPermission": "$(PRODUCT_NAME) requires camera access in order to capture and transmit video",
          "microphonePermission": "$(PRODUCT_NAME) requires microphone access in order to capture and transmit audio"
        }
      ]
    ]
  }
}
```

---

## Step 4 — Run Prebuild

If not using Expo EAS Build, regenerate native directories:

```bash
npx expo prebuild --clean
```

---

## Step 5 — Install Expo Dev Client

Since the SDK is not compatible with Expo Go, install the dev client:

```bash
npx expo install expo-dev-client
```

---

## Step 6 — Run on Device

### iOS
iOS simulators **do not** support audio/video recording. Always test on actual devices.

### Android
Android emulators can send static video streams for basic testing, but actual devices provide the best experience.

### Hardware Detection (Android)

Use these utility methods to detect hardware presence:

```ts
import { StreamVideoRN } from "@stream-io/video-react-native-sdk";

const hasCameraHardware = await StreamVideoRN.androidHasCameraHardware();
const hasAudioOutputHardware = await StreamVideoRN.androidHasAudioOutputHardware();
const hasMicrophoneHardware = await StreamVideoRN.androidHasMicrophoneHardware();
```

Disable camera features or SDK usage when hardware is absent.

---

## ✅ Installation Complete

After these steps, the Stream.io Video SDK is installed and configured for Expo. Now proceed to:

1. **`flows/client-setup-and-calls.md`** — to set up the `StreamVideo` provider and create/join calls.
