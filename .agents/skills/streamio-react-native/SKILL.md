---
name: streamio-react-native
description: Implement video calling features in Expo React Native apps using the Stream.io Video SDK
---

# Stream.io Video Calling for React Native (Expo)

This skill guides you through implementing **video and audio calling** in an **Expo React Native** application using the `@stream-io/video-react-native-sdk`.

> **Source of truth**: All instructions are derived from the official docs at https://getstream.io/video/docs/react-native/. When in doubt, consult the docs directly.

> **Important**: The Stream.io Video SDK requires native code and is **not available on Expo Go**. You must use [expo-dev-client](https://docs.expo.dev/development/create-development-builds/) for development builds.

---

## Prerequisites

Before using this skill, verify that the user's project meets **all** of the following:

1. An Expo React Native project exists (`npx create-expo-app` or equivalent).
2. Node.js ≥ 18 is available.
3. The user has a Stream.io account and an API key (from the [Stream Dashboard](https://dashboard.getstream.io/)).
4. For push notifications: a Firebase project (Android) and/or Apple Developer account (iOS).
5. A backend service or token-generation endpoint exists to create Stream user tokens (tokens should **never** be generated on the client).

If any prerequisite is missing, help the user satisfy it before proceeding.

---

## Decision Tree

Ask the user which video calling features they need. Use the table below to determine which flows to apply.

| User wants…                         | Flow file to follow                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| **Any video calling** (always)      | [`flows/setup-installation-expo.md`](flows/setup-installation-expo.md)       |
| **Basic calling** (always)          | [`flows/client-setup-and-calls.md`](flows/client-setup-and-calls.md)         |
| Camera & microphone controls        | [`flows/camera-and-microphone.md`](flows/camera-and-microphone.md)           |
| Native permissions handling         | [`flows/permissions.md`](flows/permissions.md)                               |
| Keep call alive in background       | [`flows/keeping-call-alive.md`](flows/keeping-call-alive.md)                 |
| Incoming calls & push notifications | [`flows/incoming-calls-expo.md`](flows/incoming-calls-expo.md)               |
| Network resilience & optimization   | [`flows/network-optimization.md`](flows/network-optimization.md)             |

---

## Execution Order

Always follow this order:

1. **Installation** — `flows/setup-installation-expo.md` — *mandatory for every project*.
2. **Client & Calls** — `flows/client-setup-and-calls.md` — *mandatory, sets up `StreamVideo` provider, creating/joining calls*.
3. **Feature flows** — Apply one or more of:
   - `flows/camera-and-microphone.md`
   - `flows/permissions.md`
   - `flows/keeping-call-alive.md`
   - `flows/incoming-calls-expo.md`
   - `flows/network-optimization.md`

### Best Practices

- **Singleton client**: Always use `StreamVideoClient.getOrCreateInstance()` instead of `new StreamVideoClient()`. Multiple client instances can break push notifications and call state management.
- **Clean up resources**: Call `call.leave()` when leaving a call to release allocated resources.
- **Test on real devices**: iOS simulators don't support audio/video recording; Android emulators have limited support.
- **Handle call lifecycle**: Use `useEffect` cleanup functions to properly dispose of call instances.
- **Request permissions just-in-time**: Ask for camera and microphone access right before first use.
- **Never generate tokens on client**: Always fetch user tokens from your backend server.

---

## Important Notes

- **No Expo Go**: The SDK uses native modules (WebRTC). You must use development builds via `expo-dev-client`.
- **Call types**: There are 4 built-in [call types](https://getstream.io/video/docs/react-native/guides/configuring-call-types/) (`default`, `audio_room`, `livestream`, `development`). You can also create custom call types. The call type controls permissions and enabled features.
- **Call IDs**: Call IDs can be reused (e.g., for recurring meetings). However, for ringing calls, always provide a unique call ID.
- **Expo Prebuild**: After modifying `app.json` plugins, always run `npx expo prebuild --clean` if not using EAS Build.
