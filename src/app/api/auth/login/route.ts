import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, sessionCookie } from "@/lib/auth";
import { ensureEnvironmentAdmin } from "@/lib/admin";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json() as { email?: string; password?: string };
    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    await connectToDatabase();
    await ensureEnvironmentAdmin();
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    if (user.status === "pending") return NextResponse.json({ error: "Your account is still awaiting admin approval." }, { status: 403 });
    if (user.status === "rejected") return NextResponse.json({ error: "Your registration was not approved. Please contact the team." }, { status: 403 });
    if (user.status !== "approved") return NextResponse.json({ error: "This account is no longer active." }, { status: 403 });
    const response = NextResponse.json({ message: "Signed in successfully.", user: { id: user.id, name: user.name, role: user.role } });
    response.cookies.set(sessionCookie(await createSessionToken({ userId: user.id, role: user.role, status: user.status })));
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
