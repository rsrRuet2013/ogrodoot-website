# Camera & Microphone

This flow covers managing camera, microphone, and screen sharing in React web applications.

> **Reference**: https://getstream.io/video/docs/react/guides/camera-and-microphone/

---

## Camera Controls

### Toggle Camera

```tsx
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const CameraToggle = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();

  return (
    <button onClick={() => camera.toggle()}>
      {isMute ? "Turn on camera" : "Turn off camera"}
    </button>
  );
};
```

### Select Camera Device

```tsx
const CameraSelector = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, devices, selectedDevice } = useCameraState();

  return (
    <select
      value={selectedDevice}
      onChange={(e) => camera.select(e.target.value)}
    >
      {devices?.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </select>
  );
};
```

### Camera Facing Mode

```ts
const { camera, direction } = useCameraState();
await camera.flip(); // Toggle front/back (useful for mobile web)
```

---

## Microphone Controls

### Toggle Microphone

```tsx
const MicrophoneToggle = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  return (
    <button onClick={() => microphone.toggle()}>
      {isMute ? "Turn on microphone" : "Turn off microphone"}
    </button>
  );
};
```

### Select Microphone Device

```tsx
const MicrophoneSelector = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, devices, selectedDevice } = useMicrophoneState();

  return (
    <select
      value={selectedDevice}
      onChange={(e) => microphone.select(e.target.value)}
    >
      {devices?.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </select>
  );
};
```

### Speaking While Muted Detection

```tsx
const { useMicrophoneState } = useCallStateHooks();
const { isSpeakingWhileMuted } = useMicrophoneState();

if (isSpeakingWhileMuted) {
  // Show "You're muted!" notification
}
```

---

## Speaker Controls

### Select Speaker Device

```tsx
const SpeakerSelector = () => {
  const { useSpeakerState } = useCallStateHooks();
  const { speaker, devices, selectedDevice } = useSpeakerState();

  return (
    <select
      value={selectedDevice}
      onChange={(e) => speaker.select(e.target.value)}
    >
      {devices?.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </select>
  );
};
```

---

## Screen Sharing

### Toggle Screen Share

```tsx
const ScreenShareToggle = () => {
  const { useScreenShareState } = useCallStateHooks();
  const { screenShare, isMute: isScreenShareOff } = useScreenShareState();

  return (
    <button onClick={() => screenShare.toggle()}>
      {isScreenShareOff ? "Start screen share" : "Stop screen share"}
    </button>
  );
};
```

> The SDK's built-in `ScreenShareButton` component handles this automatically.

---

## Device Persistence

Device preferences (last selected camera, microphone, speaker) are **persisted by default** on web. Configure or disable via:

```ts
const client = new StreamVideoClient({
  apiKey,
  user,
  token,
  options: {
    devicePersistence: false, // Disable device persistence
  },
});
```

---

## Browser Permission Handling

- Users get **one chance** to grant camera/mic access.
- Handle denial gracefully with a message directing users to browser settings.
- Add a **user interaction** (button click) before joining to satisfy browser autoplay policies.

---

## ✅ Camera & Microphone Setup Complete

Your app now has full media device controls. Proceed to:

1. **`flows/ui-components.md`** — to use built-in UI components.
2. **`flows/ringing-calls.md`** — to implement ringing call flows.
