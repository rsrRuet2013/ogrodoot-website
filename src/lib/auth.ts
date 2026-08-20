import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "rosb_session";
const encoder = new TextEncoder();

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is not configured.");
  return encoder.encode(value);
}

export type Session = { userId: string; role: "member" | "lead" | "admin"; status: string };

export async function createSessionToken(session: Session) {
  return new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret());
}

export async function readSessionToken(token?: string | null): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const { userId, role, status } = payload as JWTPayload & Session;
    if (!userId || !role || !status) return null;
    return { userId, role, status };
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return readSessionToken(store.get(COOKIE_NAME)?.value);
}

export const sessionCookie = (token: string) => ({
  name: COOKIE_NAME,
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

export { COOKIE_NAME };
