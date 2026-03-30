# Setup & Client

This flow is **mandatory** for every project. It installs the Stream.io Video React SDK and sets up the client and call providers.

> **Reference**: https://getstream.io/video/docs/react/basics/quickstart/

---

## Step 1 — Install the SDK

```bash
npm install @stream-io/video-react-sdk
# or
yarn add @stream-io/video-react-sdk
```

This single package includes everything: hooks, UI components, types, and CSS.

---

## Step 2 — Create the StreamVideoClient

Create a `StreamVideoClient` at the app root. Clean up with `disconnectUser()` on unmount.

```tsx
// App.tsx
import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";

const apiKey = "your-api-key";
const user: User = { id: "user-id" };
const token = "authentication-token";

export const App = () => {
  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, token });
    setClient(myClient);

    return () => {
      myClient.disconnectUser().catch(console.error);
      setClient(undefined);
    };
  }, []);

  if (!client) return null;

  return (
    <StreamVideo client={client}>
      {/* Your app content */}
    </StreamVideo>
  );
};
```

### Using a Token Provider (recommended for production)

```tsx
const myClient = new StreamVideoClient({
  apiKey,
  user,
  tokenProvider: async () => {
    const response = await fetch(`/api/stream-token?userId=${user.id}`);
    const data = await response.json();
    return data.token;
  },
});
```

---

## Step 3 — Create and Join a Call

```tsx
import { useEffect, useState } from "react";
import {
  Call,
  StreamCall,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";

const CallUI = ({ client }: { client: StreamVideoClient }) => {
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const myCall = client.call("default", "my-first-call");
    myCall.join({ create: true }).catch(console.error);
    setCall(myCall);

    return () => {
      myCall.leave().catch(console.error);
      setCall(undefined);
    };
  }, [client]);

  if (!call) return null;

  return (
    <StreamCall call={call}>
      {/* Your call UI */}
    </StreamCall>
  );
};
```

### Call Types

There are 4 built-in call types:
- `default` — standard video call
- `audio_room` — audio-only room
- `livestream` — broadcasting
- `development` — for testing

### Load Without Joining

```ts
const call = client.call("default", "my-first-call");
await call.getOrCreate();
```

---

## Step 4 — Render Participants

```tsx
import {
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";

const VideoUI = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <>
      {participants.map((p) => (
        <ParticipantView participant={p} key={p.sessionId} />
      ))}
    </>
  );
};
```

The participant object contains audio/video tracks, user info, and enabled states. `sessionId` uniquely identifies each participant.

---

## Step 5 — Leave and End Calls

### Leave (keeps call alive for others)

```ts
await call.leave();
```

### End (terminates for everyone)

```ts
await call.endCall();
```

---

## ✅ Setup Complete

Your React app now has a working Stream.io Video client. Proceed to:

1. **`flows/camera-and-microphone.md`** — to add camera/microphone controls.
2. **`flows/ui-components.md`** — to use built-in UI components.
