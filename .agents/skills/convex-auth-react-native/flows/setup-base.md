# Base Setup

This flow is **mandatory** for every project. It installs the library, configures environment variables, and creates the foundational Convex auth files.

---

## Step 1 — Install Dependencies

```bash
npm install @convex-dev/auth @auth/core
```

If the user plans to use OTPs or password reset, also install:

```bash
npm install @oslojs/crypto
```

If using Resend for email:

```bash
npm install resend
```

---

## Step 2 — Set `SITE_URL` Environment Variable

> Not needed if the user is **only** using passwords (no OAuth, no magic links).

For local development (adjust the port as needed):

```bash
npx convex env set SITE_URL http://localhost:8081
```

For React Native with Expo, the URL is typically the Expo dev server URL (e.g., `http://localhost:8081`) or a custom scheme.

---

## Step 3 — Generate and Set JWT Keys

Create a temporary file `generateKeys.mjs` in the project root:

```js
// generateKeys.mjs
import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

const keys = await generateKeyPair("RS256", { extractable: true });
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

process.stdout.write(
  `JWT_PRIVATE_KEY="${privateKey.trimEnd().replace(/\n/g, " ")}"`,
);
process.stdout.write("\n");
process.stdout.write(`JWKS=${jwks}`);
process.stdout.write("\n");
```

Run it:

```bash
node generateKeys.mjs
```

Copy the **entire output** and set both variables on the Convex backend:

```bash
npx convex env set JWT_PRIVATE_KEY "<value from output>"
npx convex env set JWKS '<value from output>'
```

Or paste them into the Convex Dashboard → Settings → Environment Variables.

After setting the variables, delete `generateKeys.mjs`.

---

## Step 4 — Update `tsconfig.json`

In the project's **`convex/tsconfig.json`** (create it if it doesn't exist), ensure:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "moduleResolution": "Bundler"
  }
}
```

If the project-level `tsconfig.json` uses `"moduleResolution": "Node"`, add `"skipLibCheck": true` there as well.

---

## Step 5 — Create `convex/auth.config.ts`

```ts
// convex/auth.config.ts
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
```

---

## Step 6 — Create `convex/auth.ts`

Start with an empty providers array. Providers will be added by subsequent flows.

```ts
// convex/auth.ts
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [],
});
```

---

## Step 7 — Create `convex/http.ts`

```ts
// convex/http.ts
import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

export default http;
```

---

## Step 8 — Add Auth Tables to Schema

In `convex/schema.ts`, spread `authTables` to register the library's tables:

```ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
});

export default schema;
```

### Customising the `users` table (optional)

If you need additional fields on the `users` table, **inline** the table definition:

```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    // Default fields (keep these):
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Add your custom fields here:
  }).index("email", ["email"]),
  // Your other tables...
});

export default schema;
```

---

## ✅ Base Setup Complete

After these steps the Convex auth infrastructure is in place. Now proceed to:

1. **`flows/react-native-provider.md`** — to wire up `ConvexAuthProvider` in the RN app.
2. **One or more auth method flows** — to add actual sign-in capabilities.
