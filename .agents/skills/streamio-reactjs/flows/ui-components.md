# UI Components

This flow covers using Stream's built-in UI components and theming for a polished video call experience.

> **References**:
> - https://getstream.io/video/docs/react/basics/prebuilt/
> - https://getstream.io/video/docs/react/ui-components/call/call-controls/

---

## Step 1 — Import CSS

When using built-in components, **always** import the SDK stylesheet:

```tsx
import "@stream-io/video-react-sdk/dist/css/styles.css";
```

---

## Step 2 — Use Built-in Layout & Controls

The SDK ships with pre-built layouts and call controls:

```tsx
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const CallScreen = () => (
  <StreamVideo client={client}>
    <StreamCall call={call}>
      <StreamTheme>
        <SpeakerLayout participantBarPosition="right" />
        <CallControls />
      </StreamTheme>
    </StreamCall>
  </StreamVideo>
);
```

### Available Layouts

- **`SpeakerLayout`** — Focused on the active speaker with a sidebar of other participants.
- **`PaginatedGridLayout`** — Grid of all participants with pagination.
- **`LivestreamLayout`** — Optimized for broadcasting scenarios.

---

## Step 3 — Built-in Call Control Buttons

The `CallControls` component automatically renders available controls based on user permissions. You can also use individual buttons for custom layouts:

| Component | Purpose |
| --------- | ------- |
| `ToggleAudioPublishingButton` | Mute/unmute microphone during call |
| `ToggleVideoPublishingButton` | Enable/disable camera during call |
| `ToggleAudioPreviewButton` | Toggle audio in lobby/preview before joining |
| `ToggleVideoPreviewButton` | Toggle video in lobby/preview before joining |
| `ToggleAudioOutputButton` | Switch audio output device |
| `ScreenShareButton` | Start/stop screen sharing |
| `RecordCallButton` | Start/stop call recording (permission-gated) |
| `RecordCallConfirmationButton` | Record with confirmation dialog |
| `ReactionsButton` | Send reactions (👍, ✋, 🎉) |
| `AcceptCallButton` | Accept incoming ringing call |
| `CancelCallButton` | Leave call or reject incoming call |
| `CancelCallConfirmButton` | Leave or end call for all (if permitted) |
| `CallStatsButton` | Show call statistics overlay |

### Custom Layout Example

```tsx
import {
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ScreenShareButton,
  CancelCallButton,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const CustomControls = () => (
  <div className="my-call-controls">
    <ToggleAudioPublishingButton />
    <ToggleVideoPublishingButton />
    <ScreenShareButton />
    <CancelCallButton onLeave={() => router.push("/")} />
  </div>
);
```

---

## Step 4 — Theming with StreamTheme

Wrap your call UI in `StreamTheme` for consistent styling:

```tsx
<StreamTheme>
  {/* All child components inherit the theme */}
</StreamTheme>
```

Customize via CSS custom properties or override the default styles. See the [Video Theme guide](https://getstream.io/video/docs/react/ui-components/video-theme/) for details.

---

## Step 5 — Call Recordings List

Display recorded calls using the built-in component:

```tsx
import { CallRecordingList } from "@stream-io/video-react-sdk";

const RecordingsPage = () => (
  <StreamCall call={call}>
    <CallRecordingList />
  </StreamCall>
);
```

> **Reference**: https://getstream.io/video/docs/react/ui-components/call/call-recordings-list/

---

## ✅ UI Components Setup Complete

Your app now uses Stream's built-in components. Proceed to:

1. **`flows/ringing-calls.md`** — to implement ringing/incoming call flows.
2. **`flows/ui-cookbook.md`** — for advanced customizations like PiP and fullscreen.
