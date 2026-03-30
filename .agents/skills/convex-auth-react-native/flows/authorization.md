# Authorization

How to protect your UI and backend functions based on authentication state.

---

## Frontend — Controlling UI Visibility

Use the helper components from `convex/react` to conditionally render content:

```tsx
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { View, Text, ActivityIndicator } from "react-native";

export function App() {
  return (
    <View>
      <AuthLoading>
        <ActivityIndicator />
      </AuthLoading>

      <Unauthenticated>
        {/* Show sign-in screen */}
        <SignIn />
      </Unauthenticated>

      <Authenticated>
        {/* Show authenticated content */}
        <HomeScreen />
        <SignOutButton />
      </Authenticated>
    </View>
  );
}
```

---

## Frontend — Sign Out

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { Pressable, Text } from "react-native";

export function SignOutButton() {
  const { signOut } = useAuthActions();

  return (
    <Pressable onPress={() => void signOut()}>
      <Text>Sign out</Text>
    </Pressable>
  );
}
```

---

## Frontend — Access JWT Token for HTTP Actions

If your React Native app calls Convex HTTP actions directly (e.g., for file uploads or streaming), authenticate with the JWT token:

```tsx
import { useAuthToken } from "@convex-dev/auth/react";

function SomeComponent() {
  const token = useAuthToken();

  const handleUpload = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_CONVEX_SITE_URL}/someEndpoint`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // ...
  };

  // ...
}
```

> Set `EXPO_PUBLIC_CONVEX_SITE_URL` to your Convex HTTP Actions URL (ending in `.site`).

---

## Backend — Get the Current User ID

Use `getAuthUserId()` in any query, mutation, or action to get the signed-in user's ID:

```ts
// convex/users.ts
import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
```

Returns `Doc<"users">` or `null` if not authenticated.

---

## Backend — Get the Current Session ID

Use `getAuthSessionId()` to access the current session:

```ts
// convex/sessions.ts
import { getAuthSessionId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const currentSession = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) {
      return null;
    }
    return await ctx.db.get(sessionId);
  },
});
```

Returns `Doc<"authSessions">` or `null` if not authenticated.

---

## Backend — Protect a Mutation

A common pattern to require authentication:

```ts
// convex/messages.ts
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    await ctx.db.insert("messages", {
      body: args.body,
      userId,
    });
  },
});
```

---

## Data Model Summary

| Table          | Purpose                                | Created when        |
| -------------- | -------------------------------------- | ------------------- |
| `users`        | One document per user                  | First sign-up       |
| `authSessions` | One document per active session        | Each sign-in        |
| `authAccounts` | Links users to auth methods (internal) | Each sign-up method |

- One user can have **many active sessions** simultaneously.
- Session documents are deleted when the session **expires** or the user **signs out**.

---

## ✅ Authorization Setup Complete
