# Email OTP (One-Time Password)

Set up email OTP sign-in: users enter their email, receive a code, and submit it to sign in.

---

## Step 1 — Choose an Email Provider

Convex Auth uses Auth.js email providers to send emails. [Resend](https://resend.com) is recommended.

1. Sign up at [Resend](https://resend.com) and obtain your API key.
2. (Optional) Verify your email domain in Resend to avoid spam issues.

---

## Step 2 — Set Environment Variables

```bash
npx convex env set AUTH_RESEND_KEY <your-resend-api-key>
```

---

## Step 3 — Install Dependencies

```bash
npm install resend @oslojs/crypto
```

---

## Step 4 — Create the OTP Provider

Create `convex/ResendOTP.ts`:

```ts
// convex/ResendOTP.ts
import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15, // 15 minutes

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
      subject: `Sign in to My App`,
      text: "Your code is " + token,
    });
    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
```

> **Customise**: Update the `from` address, `subject`, and email body to match your app's branding.

---

## Step 5 — Add Provider to `convex/auth.ts`

```ts
// convex/auth.ts
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP } from "./ResendOTP";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ResendOTP],
});
```

If combining with other providers, add `ResendOTP` to the existing `providers` array.

---

## Step 6 — Create the Two-Step Sign-In Form (React Native)

The OTP flow has two steps:
1. User enters their email → call `signIn("resend-otp", formData)` → email is sent.
2. User enters the code → call `signIn("resend-otp", formData)` again with `code` and `email`.

```tsx
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";

export function SignInWithOTP() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"email" | { email: string }>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  if (step === "email") {
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
            void signIn("resend-otp", formData).then(() =>
              setStep({ email })
            );
          }}
        >
          <Text>Send code</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Enter code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <Pressable
        onPress={() => {
          const formData = new FormData();
          formData.append("code", code);
          formData.append("email", step.email);
          void signIn("resend-otp", formData);
        }}
      >
        <Text>Verify</Text>
      </Pressable>
      <Pressable onPress={() => setStep("email")}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
}
```

> The library automatically **rate-limits** failed code attempts.

---

## Phone OTP Variant

For phone OTPs (e.g., via Twilio), the process is similar but use a `phone` field instead of `email`. See the [example Twilio OTP provider](https://github.com/get-convex/convex-auth-example/blob/main/convex/otp/TwilioOTP.ts) in the official repo.

---

## ✅ Email OTP Complete
