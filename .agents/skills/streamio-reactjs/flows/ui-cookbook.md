# UI Cookbook

This flow covers advanced UI customizations: fullscreen mode, picture-in-picture, participant view customizations, and notification sounds.

> **References**:
> - https://getstream.io/video/docs/react/ui-cookbook/fullscreen-mode/
> - https://getstream.io/video/docs/react/ui-cookbook/picture-in-picture/
> - https://getstream.io/video/docs/react/ui-cookbook/participant-view-customizations/
> - https://getstream.io/video/docs/react/ui-cookbook/participant-notification-sound/

---

## Fullscreen Mode

Enable fullscreen for the call view using the browser's Fullscreen API:

```tsx
import { useRef } from "react";

const FullscreenCall = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  return (
    <div ref={containerRef}>
      {/* Your call layout */}
      <button onClick={toggleFullscreen}>
        {document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen"}
      </button>
    </div>
  );
};
```

> **Reference**: https://getstream.io/video/docs/react/ui-cookbook/fullscreen-mode/

---

## Picture in Picture (PiP)

Enable PiP to keep the video visible when users switch tabs or windows:

```tsx
const PictureInPicture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePiP = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (videoRef.current) {
      await videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={togglePiP}>Toggle PiP</button>
    </>
  );
};
```

> **Reference**: https://getstream.io/video/docs/react/ui-cookbook/picture-in-picture/

---

## Participant View Customizations

Customize how each participant is rendered using the `ParticipantView` component props:

```tsx
import { ParticipantView } from "@stream-io/video-react-sdk";

const CustomParticipant = ({ participant }) => (
  <ParticipantView
    participant={participant}
    // Custom overlay with participant info
    ParticipantViewUI={
      <div className="participant-overlay">
        <span>{participant.name}</span>
        {participant.isSpeaking && <span>🔊</span>}
      </div>
    }
  />
);
```

> **Reference**: https://getstream.io/video/docs/react/ui-cookbook/participant-view-customizations/

---

## Participant Notification Sound

Play a sound when participants join or leave:

```tsx
import { useEffect, useRef } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const ParticipantNotification = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const prevCountRef = useRef(participants.length);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (participants.length > prevCountRef.current) {
      audioRef.current?.play().catch(console.error);
    }
    prevCountRef.current = participants.length;
  }, [participants.length]);

  return <audio ref={audioRef} src="/sounds/join.mp3" preload="auto" />;
};
```

> **Reference**: https://getstream.io/video/docs/react/ui-cookbook/participant-notification-sound/

---

## ✅ UI Cookbook Complete

Your app now has advanced UI customizations. Proceed to:

1. **`flows/network-optimization.md`** — for network quality and resilience features.
