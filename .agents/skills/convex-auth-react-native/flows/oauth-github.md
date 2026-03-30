# GitHub OAuth

Set up GitHub as an OAuth provider for sign-in.

---

## Step 1 — Register a GitHub OAuth App

1. Go to [https://github.com/settings/applications/new](https://github.com/settings/applications/new).
2. Fill in:
   - **Application name**: Your app name (shown to users during login).
   - **Homepage URL**: `http://localhost:8081` (or your dev server URL).
   - **Authorization callback URL**: Your Convex HTTP Actions URL + `/api/auth/callback/github`.
     - Find the HTTP Actions URL in the [Convex Dashboard](https://dashboard.convex.dev/) → Settings → URL & Deploy Key.
     - It matches your deployment URL but ends in **`.site`** instead of `.cloud`.
     - Example: `https://fast-horse-123.convex.site/api/auth/callback/github`
3. Click **Register application**.
4. Copy the **Client ID**.
5. Click **Generate a new client secret** and copy the secret.

---

## Step 2 — Set Environment Variables

```bash
npx convex env set AUTH_GITHUB_ID <your-github-client-id>
npx convex env set AUTH_GITHUB_SECRET <your-github-client-secret>
```

---

## Step 3 — Add Provider to `convex/auth.ts`

```ts
// convex/auth.ts
import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub],
});
```

If combining with other providers, simply add `GitHub` to the existing `providers` array.

---

## Step 4 — Create a Sign-In Button (React Native)

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { Pressable, Text } from "react-native";

export function SignInWithGitHub() {
  const { signIn } = useAuthActions();

  return (
    <Pressable onPress={() => void signIn("github")}>
      <Text>Sign in with GitHub</Text>
    </Pressable>
  );
}
```

The first argument `"github"` is the **provider ID** — a lowercase version of the provider name.

---

## Step 5 — (Optional) Retrieve Additional Profile Data

By default only `name`, `email`, and `image` are saved. To store additional fields (e.g., `githubId`):

1. Customise the provider in `convex/auth.ts`:

```ts
import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub({
      profile(githubProfile, tokens) {
        return {
          id: githubProfile.id,
          name: githubProfile.name,
          email: githubProfile.email,
          image: githubProfile.avatar_url,
          githubId: String(githubProfile.id),
        };
      },
    }),
  ],
});
```

2. Add the custom field to your schema (see `setup-base.md` → Customising the users table).

---

## ✅ GitHub OAuth Complete
