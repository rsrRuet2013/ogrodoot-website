# Apple Sign-In (OAuth)

Set up Sign in with Apple as an OAuth provider.

> **Important**: Apple does **not** allow testing on `localhost`. You must deploy your app to a public URL with a valid SSL certificate before testing.

---

## Step 1 — Create an App ID

1. Open [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list).
2. Select **App IDs** → click **+**.
3. Choose **App IDs** → **App** → click **Continue**.
4. Fill in **Description** and **Explicit Bundle ID**.
5. Scroll down, check **Sign in with Apple**.
6. Click **Continue** → **Register**.

---

## Step 2 — Create a Service ID

1. Back on the Identifiers page, select **Services IDs** from the dropdown.
2. Click **+** → select **Services IDs** → **Continue**.
3. Fill in **Description** and **Identifier** (this will be your `AUTH_APPLE_ID`).
4. Click **Continue** → **Register**.

---

## Step 3 — Create a Key

1. Go to [Keys](https://developer.apple.com/account/resources/authkeys/list) → click **+**.
2. Enter a **Key Name**, check **Sign in with Apple**, click **Configure**.
3. Select the **App ID** from Step 1 as the Primary App ID → **Save**.
4. Click **Continue** → **Register**.
5. **Download the key** file and store it safely.

---

## Step 4 — Configure the Callback URL

1. Go back to Identifiers → select **Services IDs** → click your Service ID.
2. Check **Sign In with Apple** → click **Configure**.
3. For **Domains and Subdomains**, enter your Convex HTTP Actions domain (e.g., `fast-horse-123.convex.site`).
4. For **Return URLs**, enter: `https://<deployment-name>.convex.site/api/auth/callback/apple`
5. Click **Next** → **Done** → **Continue** → **Save**.

---

## Step 5 — Set Environment Variables

```bash
npx convex env set AUTH_APPLE_ID <your-apple-service-identifier>
```

For `AUTH_APPLE_SECRET`, you need to generate a **signed JWT** using your Team ID, Service ID, Key ID, and the downloaded key file. The Convex Auth docs provide an in-browser tool for this at the [Apple setup page](https://labs.convex.dev/auth/config/oauth/apple).

```bash
npx convex env set AUTH_APPLE_SECRET <your-generated-jwt-secret>
```

> **Note**: The Apple client secret is only valid for **6 months**. You must regenerate and update it before it expires.

---

## Step 6 — Add Provider to `convex/auth.ts`

Apple only shares the user's name on the **first** authentication. The `profile` function below handles this:

```ts
// convex/auth.ts
import Apple from "@auth/core/providers/apple";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Apple({
      profile: (appleInfo) => {
        const name = appleInfo.user
          ? `${appleInfo.user.name.firstName} ${appleInfo.user.name.lastName}`
          : undefined;
        return {
          id: appleInfo.sub,
          name: name,
          email: appleInfo.email,
        };
      },
    }),
  ],
});
```

If combining with other providers, add the `Apple(...)` config to the existing `providers` array.

---

## Step 7 — Create a Sign-In Button (React Native)

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { Pressable, Text } from "react-native";

export function SignInWithApple() {
  const { signIn } = useAuthActions();

  return (
    <Pressable onPress={() => void signIn("apple")}>
      <Text>Sign in with Apple</Text>
    </Pressable>
  );
}
```

---

## ✅ Apple Sign-In Complete
