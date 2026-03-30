# Network Optimization & Resilience

This flow covers implementing network quality indicators, handling network disruptions, and optimizing for low bandwidth conditions.

> **References**:
> - https://getstream.io/video/docs/react-native/ui-cookbook/network-quality-indicator/
> - https://getstream.io/video/docs/react-native/ui-cookbook/network-disruption/
> - https://getstream.io/video/docs/react-native/ui-cookbook/low-bandwidth/

---

## Network Quality Indicator

Display a visual indicator showing each participant's connection quality during a call.

### Using the Built-in Hook

```tsx
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";

const NetworkIndicator = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <>
      {participants.map((participant) => (
        <View key={participant.sessionId}>
          <Text>{participant.name}</Text>
          <Text>Connection: {participant.connectionQuality}</Text>
          {/* connectionQuality: "excellent" | "good" | "poor" | "unspecified" */}
        </View>
      ))}
    </>
  );
};
```

### Custom Network Quality Badge

```tsx
import { View, StyleSheet } from "react-native";

type ConnectionQuality = "excellent" | "good" | "poor" | "unspecified";

const getQualityColor = (quality: ConnectionQuality) => {
  switch (quality) {
    case "excellent": return "#4CAF50";
    case "good": return "#FFC107";
    case "poor": return "#F44336";
    default: return "#9E9E9E";
  }
};

const NetworkQualityBadge = ({ quality }: { quality: ConnectionQuality }) => (
  <View style={[styles.badge, { backgroundColor: getQualityColor(quality) }]}>
    <View style={styles.bar} />
    <View style={[styles.bar, quality === "poor" && styles.barInactive]} />
    <View style={[styles.bar, quality !== "excellent" && styles.barInactive]} />
  </View>
);

const styles = StyleSheet.create({
  badge: { flexDirection: "row", alignItems: "flex-end", gap: 2, padding: 4, borderRadius: 4 },
  bar: { width: 3, backgroundColor: "#fff", borderRadius: 1 },
  barInactive: { opacity: 0.3 },
});
```

---

## Network Disruption Handling

Handle scenarios where a participant loses their network connection during a call.

### Detecting Disconnections

```tsx
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";

const ConnectionStatus = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // callingState can be:
  // "idle" | "ringing" | "joining" | "joined" | "left" | "reconnecting" | "reconnecting-failed" | "migrating"

  if (callingState === "reconnecting") {
    return <Text>Reconnecting...</Text>;
  }

  if (callingState === "reconnecting-failed") {
    return <Text>Connection lost. Please check your network.</Text>;
  }

  return null;
};
```

### Using NetInfo for Proactive Detection

```tsx
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
};
```

---

## Low Bandwidth Optimization

Optimize the call experience for users on slow or unstable connections.

### Adaptive Bitrate

The Stream SDK automatically adjusts video quality based on network conditions. You can also manually configure bandwidth limits:

```ts
// Reduce video quality for low bandwidth
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
    if (callingState === "reconnecting") {
      // Disable camera to save bandwidth during reconnection
      camera.disable();
    }
  }, [callingState]);

  return null;
};
```

### Audio-Only Mode

For extremely poor connections, switch to audio-only:

```tsx
const AudioOnlyToggle = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();

  const enableAudioOnly = async () => {
    if (!isMute) {
      await camera.disable();
    }
  };

  return (
    <Button title="Audio Only Mode" onPress={enableAudioOnly} />
  );
};
```

---

## Expo SDK Integration

Use these Expo SDKs alongside Stream.io for enhanced network-aware behavior:

### expo-audio
For managing audio sessions and routing alongside Stream's audio:
- Docs: https://docs.expo.dev/versions/latest/sdk/audio/

### expo-background-task
For scheduling background work (e.g., call quality reporting):
- Docs: https://docs.expo.dev/versions/latest/sdk/background-task/

### @react-native-community/netinfo
Already installed as part of the SDK setup — use it for connectivity detection as shown above.

---

## ✅ Network Optimization Complete

Your app now handles varying network conditions gracefully with quality indicators, disruption handling, and low bandwidth optimization.
