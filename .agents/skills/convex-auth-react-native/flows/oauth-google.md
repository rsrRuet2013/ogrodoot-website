# Google OAuth

Set up Google as an OAuth provider for sign-in.

---

## Step 1 — Create or Open a Google Cloud Project

1. Open the [Google Auth Platform](https://console.cloud.google.com/auth/overview) and select or create a project.
2. Click **GET STARTED** on the Overview page.
3. Provide the **App name** (shown to users).
4. Select a **User support email**.
5. Choose **External** audience for public apps.
6. Complete the remaining steps (contact info, data policy) and click **CREATE**.
7. If **External**: go to **Audience** in the left menu and add test user email accounts.

---

## Step 2 — Configure an OAuth Client

1. Click **Clients** in the left menu → **Create client**.
2. Select **Web Application** as the client type.
3. Set **Authorized JavaScript origins**: `http://localhost:8081` (or your dev server URL).
4. Set **Authorized redirect URIs**: your Convex HTTP Actions URL + `/api/auth/callback/google`.
   - Find the HTTP Actions URL in the [Convex Dashboard](https://dashboard.convex.dev/) → Settings.
   - It ends in **`.site`** instead of `.cloud`.
   - Example: `https://fast-horse-123.convex.site/api/auth/callback/google`
5. Click **CREATE** and note the **Client ID** and **Client secret**.

---

## Step 3 — Set Environment Variables

```bash
npx convex env set AUTH_GOOGLE_ID <your-google-client-id>
npx convex env set AUTH_GOOGLE_SECRET <your-google-client-secret>
```

---

## Step 4 — Add Provider to `convex/auth.ts`

```ts
// convex/auth.ts
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google],
});
```

If combining with other providers, add `Google` to the existing `providers` array.

---

## Step 5 — Create a Sign-In Button (React Native)

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { Pressable, Text } from "react-native";

export function SignInWithGoogle() {
  const { signIn } = useAuthActions();

  return (
    <Pressable onPress={() => void signIn("google")}>
      <Text>Sign in with Google</Text>
    </Pressable>
  );
}
```

---

## ✅ Google OAuth Complete
