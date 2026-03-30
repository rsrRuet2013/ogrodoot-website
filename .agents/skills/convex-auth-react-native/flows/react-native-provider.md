# React Native Provider Setup

This flow configures the `ConvexAuthProvider` specifically for React Native. It **must** be applied after the base setup.

---

## Why This Is Needed

React Native does not have `localStorage`. Convex Auth requires a custom `TokenStorage` implementation to persist auth tokens securely. The recommended approach is to use `expo-secure-store`.

---

## Step 1 — Install `expo-secure-store`

```bash
npx expo install expo-secure-store
```

For bare React Native CLI projects (without Expo):

```bash
npm install expo-secure-store
npx pod-install
```

---

## Step 2 — Create a Secure Storage Adapter

Create a file (e.g., `lib/secureStorage.ts` or `utils/secureStorage.ts`):

```ts
// lib/secureStorage.ts
import * as SecureStore from "expo-secure-store";
import { TokenStorage } from "@convex-dev/auth/react";
import { Platform } from "react-native";

// On web, fall back to localStorage; on native, use SecureStore
const secureStorage: TokenStorage = {
  async getItem(key: string) {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string) {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export default secureStorage;
```

---

## Step 3 — Set Up `ConvexAuthProvider`

In your app's root component (e.g., `App.tsx` or `app/_layout.tsx` for Expo Router):

```tsx
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import secureStorage from "./lib/secureStorage";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthProvider client={convex} storage={secureStorage}>
      {children}
    </ConvexAuthProvider>
  );
}
```

### Key props for React Native

| Prop               | Purpose                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `storage`          | **Required for RN.** Pass the `secureStorage` adapter created above.                                                   |
| `storageNamespace` | Optional. Custom namespace for token keys. Defaults to the deployment URL. Non-alphanumeric chars are ignored (RN-safe). |
| `replaceURL`       | Optional. Provide if using Expo Router and the `code` param from OAuth/magic links is not being erased from the URL.    |

### Expo Router `replaceURL` example

If you use Expo Router and notice the `code` query param lingering after OAuth sign-in:

```tsx
import { useRouter } from "expo-router";

function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ConvexAuthProvider
      client={convex}
      storage={secureStorage}
      replaceURL={(relativeUrl) => {
        router.replace(relativeUrl);
      }}
    >
      {children}
    </ConvexAuthProvider>
  );
}
```

---

## Step 4 — Set `EXPO_PUBLIC_CONVEX_URL`

Make sure your `.env` (or `app.config.ts`) includes:

```
EXPO_PUBLIC_CONVEX_URL=https://<deployment-name>.convex.cloud
```

---

## ✅ Provider Setup Complete

Your React Native app is now wired to Convex Auth. Proceed to add one or more auth method flows.
