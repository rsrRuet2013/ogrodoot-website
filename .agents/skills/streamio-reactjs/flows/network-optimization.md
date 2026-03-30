# Network Optimization & Resilience

This flow covers implementing network quality indicators, handling network disruptions, and optimizing for low bandwidth conditions in React web applications.

> **References**:
> - https://getstream.io/video/docs/react/ui-cookbook/network-quality-indicator/
> - https://getstream.io/video/docs/react/ui-cookbook/network-disruption/
> - https://getstream.io/video/docs/react/ui-cookbook/low-bandwidth/

---

## Network Quality Indicator

Display a visual indicator showing each participant's connection quality:

```tsx
import { useCallStateHooks } from "@stream-io/video-react-sdk";

type ConnectionQuality = "excellent" | "good" | "poor" | "unspecified";

const getQualityColor = (quality: ConnectionQuality) => {
  switch (quality) {
    case "excellent": return "#4CAF50";
    case "good": return "#FFC107";
    case "poor": return "#F44336";
    default: return "#9E9E9E";
  }
};

const NetworkIndicator = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <>
      {participants.map((participant) => (
        <div key={participant.sessionId} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>{participant.name}</span>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: getQualityColor(participant.connectionQuality),
            }}
          />
        </div>
      ))}
    </>
  );
};
```

---

## Network Disruption Handling

Handle scenarios where a participant loses network connection during a call:

```tsx
import { useCallStateHooks, CallingState } from "@stream-io/video-react-sdk";

const ConnectionStatus = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // callingState values:
  // "idle" | "ringing" | "joining" | "joined" |
  // "left" | "reconnecting" | "reconnecting-failed" | "migrating"

  if (callingState === CallingState.RECONNECTING) {
    return (
      <div className="connection-banner warning">
        Reconnecting... Please check your network.
      </div>
    );
  }

  if (callingState === CallingState.RECONNECTING_FAILED) {
    return (
      <div className="connection-banner error">
        Connection lost. Please refresh and rejoin.
      </div>
    );
  }

  return null;
};
```

### Browser Online/Offline Detection

```tsx
import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};
```

---

## Low Bandwidth Optimization

### Adaptive Bitrate

The Stream SDK automatically adjusts video quality based on network conditions. You can also manually configure:

```ts
await call.join({
  create: true,
  data: {
    settings_override: {
      video: {
        target_resolution: {
          width: 640,
          height: 480,
          bitrate: 300000, // 300 kbps
        },
      },
    },
  },
});
```

### Disable Video on Poor Connection

```tsx
const AdaptiveVideo = () => {
  const { useCameraState, useCallCallingState } = useCallStateHooks();
  const { camera } = useCameraState();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.RECONNECTING) {
      camera.disable();
    }
  }, [callingState, camera]);

  return null;
};
```

### Audio-Only Mode

```tsx
const AudioOnlyToggle = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();

  return (
    <button onClick={() => !isMute && camera.disable()}>
      Switch to Audio Only
    </button>
  );
};
```

---

## ✅ Network Optimization Complete

Your app now handles varying network conditions gracefully with quality indicators, disruption handling, and low bandwidth optimization.
