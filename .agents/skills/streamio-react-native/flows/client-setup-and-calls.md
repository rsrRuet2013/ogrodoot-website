# Client Setup & Calls

This flow sets up the `StreamVideoClient`, the `StreamVideo` provider, and covers creating, joining, and leaving calls.

> **Reference**: https://getstream.io/video/docs/react-native/setup/quickstart/ and https://getstream.io/video/docs/react-native/guides/joining-and-creating-calls/

---

## Step 1 — Create the StreamVideo Client

Create an instance of `StreamVideoClient` using the singleton pattern. The client establishes a WebSocket connection by connecting a user.

```ts
// lib/streamClient.ts
import { StreamVideoClient, User } from "@stream-io/video-react-native-sdk";

const apiKey = "your-stream-api-key"; // From the Stream Dashboard

export function getStreamClient(user: User, token: string) {
  return StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    token,
  });
}
```

> **Always use `StreamVideoClient.getOrCreateInstance()`** instead of `new StreamVideoClient()`. Multiple client instances can break push notifications and call state management.

### Using a Token Provider (recommended for production)

Instead of passing a static token, pass a `tokenProvider` function that fetches tokens from your backend:

```ts
export function getStreamClient(user: User) {
  const tokenProvider = async (): Promise<string> => {
    const response = await fetch(`https://your-api.com/stream-token?userId=${user.id}`);
    const data = await response.json();
    return data.token;
  };

  return StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    tokenProvider,
  });
}
```

---

## Step 2 — Set Up the StreamVideo Provider

Wrap your app with the `StreamVideo` and `StreamCall` providers. In your root layout (e.g., `app/_layout.tsx` for Expo Router):

```tsx
import { StreamVideo, StreamCall } from "@stream-io/video-react-native-sdk";
import { getStreamClient } from "../lib/streamClient";

const user = { id: "user-id", name: "John Doe" };
const client = getStreamClient(user, "user-token");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StreamVideo client={client}>
      {children}
    </StreamVideo>
  );
}
```

---

## Step 3 — Create and Join a Call

A call is created by specifying a **call type** and a **call ID**.

### Call Types

There are 4 built-in call types:
- `default` — standard video call
- `audio_room` — audio-only room
- `livestream` — broadcasting
- `development` — for testing

### Creating & Joining

```ts
const call = client.call("default", "my-call-id");

// Create and join in one step
await call.join({ create: true });
```

### Wrap the Call in a Provider

```tsx
import { StreamCall } from "@stream-io/video-react-native-sdk";

function CallScreen() {
  const call = client.call("default", "my-call-id");

  useEffect(() => {
    call.join({ create: true });
    return () => {
      call.leave();
    };
  }, []);

  return (
    <StreamCall call={call}>
      {/* Your call UI components */}
    </StreamCall>
  );
}
```

---

## Step 4 — Render Participants

Access participant state using hooks from `useCallStateHooks`:

```tsx
import {
  useCallStateHooks,
  CallParticipantsList,
} from "@stream-io/video-react-native-sdk";

function VideoUI() {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return <CallParticipantsList participants={participants} />;
}
```

The participant object contains all essential information: audio/video tracks, user information, audio/video enabled status, etc.

---

## Step 5 — Leave and End Calls

### Leave a Call

Leaves the call but keeps the call alive for other participants:

```ts
await call.leave();
```

### End a Call

Terminates the call for all participants:

```ts
await call.endCall();
```

---

## Step 6 — Call Creation Options

### Set Call Members

```ts
await call.join({
  create: true,
  data: {
    members: [
      { user_id: "user-a" },
      { user_id: "user-b", role: "admin" },
    ],
  },
});
```

### Custom Call Data

```ts
await call.join({
  create: true,
  data: {
    custom: {
      title: "Team Standup",
      description: "Daily sync meeting",
    },
  },
});
```

### Update a Call

```ts
await call.update({
  custom: {
    title: "Updated Title",
  },
});
```

---

## ✅ Client Setup Complete

Your app now has a working Stream.io Video client with the ability to create, join, and leave calls. Proceed to:

1. **`flows/camera-and-microphone.md`** — to add camera/microphone controls.
2. **`flows/permissions.md`** — to handle native device permissions.
