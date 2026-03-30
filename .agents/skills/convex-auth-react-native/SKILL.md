---
name: convex-auth-react-native
description: Set up authentication and authorization in React Native apps using the Convex backend (@convex-dev/auth)
---

# Convex Auth for React Native

This skill guides you through setting up authentication and authorization in a **React Native** (CLI or Expo) application using `@convex-dev/auth`.

> **Source of truth**: All instructions are derived from the official docs at https://labs.convex.dev/auth. When in doubt, consult the docs directly.

---

## Prerequisites

Before using this skill, verify that the user's project meets **all** of the following:

1. A React Native project exists (Expo or bare CLI).
2. The Convex backend is already initialised (`convex/` directory present, `convex dev` runs).
3. Node.js ≥ 18 is available.
4. The user has (or can create) accounts with any third-party providers they want (Google Cloud, Apple Developer, GitHub, Resend, Twilio, etc.).

If any prerequisite is missing, help the user satisfy it before proceeding.

---

## Decision Tree

Ask the user which authentication methods they need. Use the table below to determine which flows to apply.

| User wants…                       | Flow file to follow                                              |
| --------------------------------- | ---------------------------------------------------------------- |
| **Any auth at all** (always)      | [`flows/setup-base.md`](flows/setup-base.md)                    |
| **React Native provider setup**   | [`flows/react-native-provider.md`](flows/react-native-provider.md) |
| GitHub OAuth                      | [`flows/oauth-github.md`](flows/oauth-github.md)                |
| Google OAuth                      | [`flows/oauth-google.md`](flows/oauth-google.md)                |
| Apple Sign-In                     | [`flows/oauth-apple.md`](flows/oauth-apple.md)                  |
| Email OTP (one-time code)         | [`flows/email-otp.md`](flows/email-otp.md)                      |
| Email + Password                  | [`flows/password.md`](flows/password.md)                        |
| Frontend/backend auth gating      | [`flows/authorization.md`](flows/authorization.md)              |
| Production deployment             | [`flows/production.md`](flows/production.md)                    |

---

## Execution Order

Always follow this order:

1. **Base setup** — `flows/setup-base.md` — *mandatory for every project*.
2. **React Native provider** — `flows/react-native-provider.md` — *mandatory, sets up `ConvexAuthProvider` with secure token storage for RN*.
3. **Auth method(s)** — Apply one or more of:
   - `flows/oauth-github.md`
   - `flows/oauth-google.md`
   - `flows/oauth-apple.md`
   - `flows/email-otp.md`
   - `flows/password.md`
4. **Authorization** — `flows/authorization.md` — *recommended, shows how to protect UI and backend*.
5. **Production** — `flows/production.md` — *when the user is ready to deploy*.

### Combining Multiple Providers

When the user wants multiple auth methods, **merge all providers into a single `convex/auth.ts`**. Example:

```ts
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub, Google, Password],
});
```

Do **not** create separate `auth.ts` files for each provider.

---

## Important Notes

- **No built-in UI**: Convex Auth does not ship UI components. You must build sign-in/sign-out screens in React Native.
- **`@auth/core/providers`**: OAuth providers are imported from `@auth/core/providers/<name>` (Auth.js providers). Ignore the "database provider" configuration in Auth.js docs — Convex is the database.
- **Environment variables**: All auth-related env vars are set on the **Convex backend** (via `npx convex env set` or the Convex dashboard), not in `.env` files in the RN project.
- **Callback URL domain**: The OAuth callback URL uses the Convex HTTP Actions URL, which ends in `.site` (not `.cloud`). Example: `https://<deployment-name>.convex.site/api/auth/callback/<provider>`.
- **React Native token storage**: You **must** provide a custom `storage` prop to `ConvexAuthProvider` because `localStorage` is not available in RN. Use `expo-secure-store` (recommended).
