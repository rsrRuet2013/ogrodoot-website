# Production Deployment

Checklist for deploying your Convex Auth-enabled React Native app to production.

---

## Step 1 — Deploy Your Convex Backend to Production

Follow the standard [Convex production deployment](https://docs.convex.dev/production) process.

---

## Step 2 — Set Up Auth Environment Variables for Production

Run the initialisation command with the `--prod` flag from your project directory:

```bash
npx @convex-dev/auth --prod
```

This sets up `SITE_URL`, `JWT_PRIVATE_KEY`, and `JWKS` on your **production** deployment.

If this command doesn't work, manually follow the [Manual Setup](https://labs.convex.dev/auth/setup/manual) steps:
1. Set `SITE_URL` to your production app's URL.
2. Generate new JWT keys (see `setup-base.md` Step 3) and set them on the production deployment.

---

## Step 3 — Configure Provider Environment Variables

Each auth provider needs its own set of environment variables on the **production** Convex deployment.

### OAuth Providers

You typically **cannot** share the same OAuth app between development and production because:
- Development uses `localhost` URLs.
- Production uses your public URL.

For each OAuth provider, create a **separate** app/client on the third-party dashboard with your production callback URL and set the corresponding env vars:

| Provider | Env Vars to Set                                        |
| -------- | ------------------------------------------------------ |
| GitHub   | `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`                 |
| Google   | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`                 |
| Apple    | `AUTH_APPLE_ID`, `AUTH_APPLE_SECRET`                   |

Production callback URLs follow the same pattern but use your **production** Convex HTTP Actions URL:

```
https://<prod-deployment-name>.convex.site/api/auth/callback/<provider>
```

### Email Providers

Set the email provider API key on the production deployment:

```bash
npx convex env set AUTH_RESEND_KEY <your-prod-resend-key> --prod
```

---

## Step 4 — Update `SITE_URL`

Ensure the `SITE_URL` on production points to your production app URL, not localhost:

```bash
npx convex env set SITE_URL https://your-production-app.com --prod
```

For React Native apps with deep linking, this would be your app's deep link scheme or universal link domain.

---

## Step 5 — Verify

1. Build and deploy your React Native app (via EAS Build, Fastlane, or your CI/CD).
2. Test all auth flows in production.
3. Verify callback URLs resolve correctly.
4. Confirm emails are being sent from verified domains (not sandbox).

---

## Reminders

- **Apple secrets expire** after 6 months. Set a reminder to regenerate.
- **Separate OAuth apps** for dev vs. prod — never share credentials.
- **Monitor Convex logs** for auth errors in the [dashboard](https://dashboard.convex.dev/).

---

## ✅ Production Deployment Complete
