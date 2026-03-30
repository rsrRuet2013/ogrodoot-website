# Ringing Calls

This flow covers implementing ringing (1:1 and group) call functionality — creating, watching, accepting, rejecting, and ending ringing calls.

> **Reference**: https://getstream.io/video/docs/react/advanced/ringing-calls/

---

## Best Practices

- **Use unique call IDs** for ringing calls (e.g., `crypto.randomUUID()`) — ringing only works once per ID.
- **Include the caller** in the `members` list when creating a ring call.
- **Use `useCalls()` hook** to watch for incoming and outgoing calls.
- **Filter calls** via `call.isCreatedByMe` to distinguish incoming vs outgoing.

---

## Step 1 — Create a Ringing Call

Set `ring: true` and provide the list of members (including the caller):

```ts
const call = client.call("default", crypto.randomUUID());

await call.getOrCreate({
  ring: true,
  video: true,
  data: {
    members: [
      { user_id: "caller-id" },     // The caller (you)
      { user_id: "callee-id" },     // The person to ring
    ],
  },
});
```

### Call Creation Options

```ts
await call.getOrCreate({
  ring: true,
  video: true,       // true for video call, false for audio-only
  data: {
    members: [
      { user_id: "caller-id" },
      { user_id: "friend-1" },
      { user_id: "friend-2" },
    ],
    custom: {
      title: "Quick sync",
    },
  },
});
```

---

## Step 2 — Watch for Incoming & Outgoing Calls

Use the `useCalls` hook to detect ringing calls:

```tsx
import { useCalls, CallingState } from "@stream-io/video-react-sdk";

const CallWatcher = () => {
  const calls = useCalls();

  // Incoming calls (created by someone else, currently ringing)
  const incomingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === false &&
      call.state.callingState === CallingState.RINGING,
  );

  // Outgoing calls (created by me, currently ringing)
  const outgoingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === true &&
      call.state.callingState === CallingState.RINGING,
  );

  const [incomingCall] = incomingCalls;
  if (incomingCall) {
    return <IncomingCallUI call={incomingCall} />;
  }

  const [outgoingCall] = outgoingCalls;
  if (outgoingCall) {
    return <OutgoingCallUI call={outgoingCall} />;
  }

  return null;
};
```

---

## Step 3 — Accept an Incoming Call

```ts
await call.join();
```

> You can join multiple calls simultaneously. To allow only one active call, leave joined calls before accepting.

---

## Step 4 — Reject an Incoming Call

```ts
await call.leave({ reject: true, reason: "decline" });
```

---

## Step 5 — Cancel an Outgoing Call

A caller can cancel before the first callee accepts:

```ts
await call.leave({ reject: true, reason: "cancel" });
```

> Calling `call.leave()` (without `reject: true`) after joining won't stop the signaling flow.

---

## Step 6 — End a Call

Terminates the call for everyone (requires `END_CALL` permission):

```ts
await call.endCall();
```

---

## Step 7 — Complete Ringing UI Example

```tsx
import {
  AcceptCallButton,
  CancelCallButton,
  StreamCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const IncomingCallUI = ({ call }: { call: Call }) => (
  <StreamCall call={call}>
    <div className="incoming-call">
      <p>Incoming call from {call.state.createdBy?.name}...</p>
      <AcceptCallButton />
      <CancelCallButton />
    </div>
  </StreamCall>
);

const OutgoingCallUI = ({ call }: { call: Call }) => (
  <StreamCall call={call}>
    <div className="outgoing-call">
      <p>Ringing...</p>
      <CancelCallButton />
    </div>
  </StreamCall>
);
```

---

## ✅ Ringing Calls Setup Complete

Your app now supports ringing calls. Proceed to:

1. **`flows/recording.md`** — to add call recording.
2. **`flows/ui-cookbook.md`** — for PiP, fullscreen, and other customizations.
