# Camera & Microphone

This flow covers managing the camera, microphone, and speaker during video calls.

> **Reference**: https://getstream.io/video/docs/react-native/guides/camera-and-microphone/

---

## Camera Management

### Start/Stop Camera

```tsx
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";

const CameraToggle = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();

  return (
    <Button
      title={isMute ? "Turn on camera" : "Turn off camera"}
      onPress={() => camera.toggle()}
    />
  );
};
```

### Switch Camera (Front/Back)

```ts
const { useCameraState } = useCallStateHooks();
const { camera, direction } = useCameraState();

// Toggle between front and back
await camera.flip();

// Or set directly
await camera.selectDirection("front"); // or "back"
```

### Video Mute Status

```ts
const { useCameraState } = useCallStateHooks();
const { isMute, status } = useCameraState();
// status: "enabled" | "disabled"
```

### Show Video Preview

Display a video preview before joining a call:

```tsx
import { VideoRenderer } from "@stream-io/video-react-native-sdk";

const { useCameraState } = useCallStateHooks();
const { camera } = useCameraState();

// Access the camera's media stream
const mediaStream = camera.state.mediaStream;
```

---

## Microphone Management

### Start/Stop Microphone

```tsx
const MicrophoneToggle = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  return (
    <Button
      title={isMute ? "Turn on microphone" : "Turn off microphone"}
      onPress={() => microphone.toggle()}
    />
  );
};
```

### Audio Mute Status

```ts
const { useMicrophoneState } = useCallStateHooks();
const { isMute, status } = useMicrophoneState();
```

### Speaking While Muted Detection

The SDK can detect when a user is speaking while muted, useful for displaying a reminder:

```ts
const { useMicrophoneState } = useCallStateHooks();
const { isSpeakingWhileMuted } = useMicrophoneState();

if (isSpeakingWhileMuted) {
  // Show "You're muted!" notification
}
```

---

## Speaker Management

### Switching Audio Output Device

```ts
const { useSpeakerState } = useCallStateHooks();
const { speaker, selectedDevice, devices } = useSpeakerState();

// List available devices
console.log(devices);

// Select a specific device
await speaker.select(deviceId);
```

### Force Audio Through Loudspeaker

```ts
const { useSpeakerState } = useCallStateHooks();
const { speaker } = useSpeakerState();

await speaker.setLoudspeaker(true);
```

### Audio Volume Control

```ts
const { useSpeakerState } = useCallStateHooks();
const { speaker } = useSpeakerState();

await speaker.setVolume(0.5); // Volume range: 0.0 to 1.0
```

### Livestream / Listener-Only Audio

For audio rooms or livestreams where participants listen only, the SDK can be configured to handle audio playback without camera/microphone access.

---

## Call Settings

Camera and microphone defaults can be configured at the call type level from the Stream Dashboard, or overridden per call:

```ts
await call.join({
  create: true,
  data: {
    settings_override: {
      video: { camera_default_on: true },
      audio: { mic_default_on: true },
    },
  },
});
```

---

## ✅ Camera & Microphone Setup Complete

Your app now has full camera, microphone, and speaker controls. Proceed to:

1. **`flows/permissions.md`** — to properly request native device permissions.
2. **`flows/keeping-call-alive.md`** — to keep calls alive when the app goes to background.
