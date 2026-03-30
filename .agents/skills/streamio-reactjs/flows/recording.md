# Recording

This flow covers implementing call recording: starting, stopping, permissions, listing recordings, and using built-in components.

> **Reference**: https://getstream.io/video/docs/react/advanced/recording/

---

## Best Practices

- **Check permissions** before showing the record button.
- **Show loading state** — recording takes a few moments to start.
- **Listen for events**: `call.recording_started` / `call.recording_stopped` to update UI.
- **Wait for `call.recording_ready`** before fetching recordings (~30+ seconds after stop).
- **Use `listRecordings()`** to retrieve recordings; optionally filter by `callSessionId`.

---

## Step 1 — Start and Stop Recording

```tsx
import { useCallback, useEffect, useState } from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

const RecordButton = () => {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isRecording = useIsCallRecordingInProgress();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!call) return;

    const handlers = [
      call.on("call.recording_started", () => setIsLoading(false)),
      call.on("call.recording_stopped", () => setIsLoading(false)),
    ];

    return () => {
      handlers.forEach((unsubscribe) => unsubscribe());
    };
  }, [call]);

  const toggleRecording = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isRecording) {
        await call?.stopRecording();
      } else {
        await call?.startRecording();
      }
    } catch (e) {
      console.error("Failed to toggle recording", e);
      setIsLoading(false);
    }
  }, [call, isRecording]);

  if (isLoading) return <span>Loading...</span>;

  return (
    <button onClick={toggleRecording}>
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
};
```

---

## Step 2 — Using the Built-in Component

The SDK provides a `RecordCallButton` that handles permissions, loading states, and visuals:

```tsx
import { RecordCallButton } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Inside your call UI
<RecordCallButton />
```

To show a confirmation before stopping:

```tsx
import { RecordCallConfirmationButton } from "@stream-io/video-react-sdk";

<RecordCallConfirmationButton />
```

---

## Step 3 — Permission Gating

Use the `Restricted` wrapper to show recording controls only to permitted users:

```tsx
import { Restricted, OwnCapability } from "@stream-io/video-react-sdk";

<Restricted requiredGrants={[OwnCapability.START_RECORD_CALL]}>
  <RecordCallButton />
</Restricted>
```

---

## Step 4 — List Recordings

```ts
const response = await call.listRecordings();
const recordings = response.recordings;

recordings.forEach((recording) => {
  console.log(recording.url);         // Download URL
  console.log(recording.start_time);  // When recording started
  console.log(recording.end_time);    // When recording ended
});
```

### Built-in Component

```tsx
import { CallRecordingList } from "@stream-io/video-react-sdk";

<CallRecordingList />
```

---

## Storage & Retention

- Recordings are stored in Stream's default S3 storage.
- You can configure **external storage** (your own S3 bucket) in the Stream Dashboard.
- Default retention is available in your Stream plan settings.

---

## ✅ Recording Setup Complete

Your app now supports call recording. Proceed to:

1. **`flows/ui-cookbook.md`** — for PiP, fullscreen, and other UI customizations.
2. **`flows/network-optimization.md`** — for network resilience features.
