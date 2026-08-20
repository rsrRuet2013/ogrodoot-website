import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });
  try {
    await connectToDatabase();
    const user = await User.findById(session.userId).select("name profilePicUrl role status").lean();
    if (!user || user.status !== "approved") return NextResponse.json({ user: null });
    return NextResponse.json({ user: { name: user.name, profilePicUrl: user.profilePicUrl, role: user.role } });
  } catch {
    return NextResponse.json({ user: null });
  }
}
