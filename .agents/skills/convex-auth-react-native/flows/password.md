# Email + Password Authentication

Set up email and password sign-in with optional password reset and email verification.

---

## Basic Email + Password

### Step 1 — Add Provider to `convex/auth.ts`

```ts
// convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});
```

If combining with other providers, add `Password` to the existing `providers` array.

### Step 2 — Create Sign-In / Sign-Up Form (React Native)

The `Password` provider uses a `flow` field to distinguish between sign-up and sign-in:

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";

export function SignInWithPassword() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signUp" | "signIn">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("flow", flow);
    void signIn("password", formData);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleSubmit}>
        <Text>{flow === "signIn" ? "Sign in" : "Sign up"}</Text>
      </Pressable>
      <Pressable
        onPress={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
      >
        <Text>
          {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
        </Text>
      </Pressable>
    </View>
  );
}
```

---

## Password Reset (Optional)

Password reset requires an email provider to send reset codes.

### Step 1 — Install Dependencies

```bash
npm install resend @oslojs/crypto
```

### Step 2 — Set Environment Variables

```bash
npx convex env set AUTH_RESEND_KEY <your-resend-api-key>
```

### Step 3 — Create the Reset Email Provider

Create `convex/ResendOTPPasswordReset.ts`:

```ts
// convex/ResendOTPPasswordReset.ts
import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,

  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };
    const alphabet = "0123456789";
    const length = 8;
    return generateRandomString(random, alphabet, length);
  },

  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "My App <onboarding@resend.dev>",
      to: [email],
      subject: `Reset your password in My App`,
      text: "Your password reset code is " + token,
    });
    if (error) {
      throw new Error("Could not send");
    }
  },
});
```

### Step 4 — Add `reset` Option to Password Provider

```ts
// convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ reset: ResendOTPPasswordReset })],
});
```

### Step 5 — Create Password Reset Form (React Native)

The reset flow uses `flow: "reset"` for requesting a code, and `flow: "reset-verification"` for submitting the new password.

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";

export function PasswordReset() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (step === "forgot") {
    return (
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Pressable
          onPress={() => {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("flow", "reset");
            void signIn("password", formData).then(() =>
              setStep({ email })
            );
          }}
        >
          <Text>Send reset code</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <TextInput placeholder="Code" value={code} onChangeText={setCode} keyboardType="number-pad" />
      <TextInput
        placeholder="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          const formData = new FormData();
          formData.append("code", code);
          formData.append("newPassword", newPassword);
          formData.append("email", step.email);
          formData.append("flow", "reset-verification");
          void signIn("password", formData);
        }}
      >
        <Text>Reset password</Text>
      </Pressable>
      <Pressable onPress={() => setStep("forgot")}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
}
```

---

## Email Verification (Optional)

### Step 1 — Create an OTP Email Provider

You can reuse the same `ResendOTP` pattern from the `email-otp.md` flow, or create a dedicated one. Use the `@auth/core/providers/resend` import:

```ts
// convex/ResendOTPVerification.ts
import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const ResendOTPVerification = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,

  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };
    return generateRandomString(random, "0123456789", 8);
  },

  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "My App <onboarding@resend.dev>",
      to: [email],
      subject: `Verify your email for My App`,
      text: "Your verification code is " + token,
    });
    if (error) {
      throw new Error("Could not send");
    }
  },
});
```

### Step 2 — Add `verify` Option to Password Provider

```ts
// convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTPVerification } from "./ResendOTPVerification";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ verify: ResendOTPVerification })],
});
```

> You can combine both: `Password({ reset: ResendOTPPasswordReset, verify: ResendOTPVerification })`

### Step 3 — Handle Verification in the Sign-In Form

After the user signs up with a `verify`-enabled Password provider, `signIn()` will return without completing. Show a code input with `flow: "email-verification"`:

```tsx
// In the code step, after sign-up:
const formData = new FormData();
formData.append("code", code);
formData.append("email", email);
formData.append("flow", "email-verification");
void signIn("password", formData);
```

---

## Custom Validation (Optional)

### Email Validation with Zod

```ts
// convex/CustomPassword.ts
import { ConvexError } from "convex/values";
import { Password } from "@convex-dev/auth/providers/Password";
import { z } from "zod";

const ParamsSchema = z.object({
  email: z.string().email(),
});

export default Password({
  profile(params) {
    const { error, data } = ParamsSchema.safeParse(params);
    if (error) {
      throw new ConvexError(error.format());
    }
    return { email: data.email };
  },
});
```

### Password Strength Validation

```ts
// convex/CustomPassword.ts
import { ConvexError } from "convex/values";
import { Password } from "@convex-dev/auth/providers/Password";

export default Password({
  validatePasswordRequirements: (password: string) => {
    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      throw new ConvexError(
        "Password must be at least 8 characters with uppercase, lowercase, and a digit."
      );
    }
  },
});
```

### Custom User Fields on Sign-Up

```ts
// convex/CustomPassword.ts
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

export default Password<DataModel>({
  profile(params, ctx) {
    return {
      email: params.email as string,
      name: params.name as string,
      role: params.role as string,
    };
  },
});
```

Remember to [customise the schema](setup-base.md) to include any additional fields.

---

## ✅ Password Auth Complete
