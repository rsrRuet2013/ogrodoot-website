---
name: streamio-reactjs
description: Implement video calling features in React (Web) applications using the Stream.io Video SDK
---

# Stream.io Video Calling for React (Web)

This skill guides you through implementing **video and audio calling** in a **React (Web)** application using the `@stream-io/video-react-sdk`.

> **Source of truth**: All instructions are derived from the official docs at https://getstream.io/video/docs/react/. When in doubt, consult the docs directly.

---

## Prerequisites

Before using this skill, verify that the user's project meets **all** of the following:

1. A React web project exists (Next.js, Vite, Create React App, or similar).
2. Node.js ≥ 18 is available.
3. The user has a Stream.io account and an API key (from the [Stream Dashboard](https://dashboard.getstream.io/)).
4. A backend service or token-generation endpoint exists to create Stream user tokens (tokens should **never** be generated on the client).

If any prerequisite is missing, help the user satisfy it before proceeding.

---

## Decision Tree

Ask the user which video calling features they need. Use the table below to determine which flows to apply.

| User wants…                         | Flow file to follow                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| **Any video calling** (always)      | [`flows/setup-and-client.md`](flows/setup-and-client.md)                         |
| Camera & microphone controls        | [`flows/camera-and-microphone.md`](flows/camera-and-microphone.md)               |
| Built-in UI components              | [`flows/ui-components.md`](flows/ui-components.md)                               |
| Ringing calls (1:1 or group)        | [`flows/ringing-calls.md`](flows/ringing-calls.md)                               |
| Call recording                      | [`flows/recording.md`](flows/recording.md)                                       |
| UI customization (PiP, fullscreen)  | [`flows/ui-cookbook.md`](flows/ui-cookbook.md)                                     |
| Network resilience & optimization   | [`flows/network-optimization.md`](flows/network-optimization.md)                 |

---

## Execution Order

Always follow this order:

1. **Setup & Client** — `flows/setup-and-client.md` — *mandatory for every project*.
2. **Core features** — Apply one or more of:
   - `flows/camera-and-microphone.md`
   - `flows/ui-components.md`
3. **Advanced features** — Apply as needed:
   - `flows/ringing-calls.md`
   - `flows/recording.md`
   - `flows/ui-cookbook.md`
   - `flows/network-optimization.md`

### Best Practices

- **Create client once at root**: Create `StreamVideoClient` once and clean up with `disconnectUser()` on unmount.
- **Use `tokenProvider`**: Use short-lived tokens from your backend instead of static tokens.
- **Use `useEffect` cleanup**: Create and join calls in `useEffect`; clean up with `call.leave()`.
- **Handle all calling states**: Handle `RINGING`, `JOINING`, `JOINED`, `LEFT`, `RECONNECTING`, etc. in your UI.
- **Handle errors**: Wrap `call.join()`, device toggles, and `connectUser()` in try/catch.
- **Browser permissions**: Users get one chance to grant camera/mic access — handle denials gracefully.
- **User interaction first**: Add a button click before joining to satisfy browser autoplay policies.

---

## Important Notes

- **Single SDK package**: The React Web SDK is `@stream-io/video-react-sdk` — it includes everything (hooks, UI components, types, CSS).
- **CSS import required**: When using built-in components, always import `@stream-io/video-react-sdk/dist/css/styles.css`.
- **Call types**: There are 4 built-in call types (`default`, `audio_room`, `livestream`, `development`). You can create custom types from the Dashboard.
- **Call IDs**: Reusable for recurring meetings. For ringing calls, always use unique IDs (e.g., `crypto.randomUUID()`).
- **Device persistence**: Device preferences are persisted by default on web. Configure via `options.devicePersistence` when creating the client.
