import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET(request: Request) {
  const session = await getSession();
  if (session?.role !== "admin") return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const status = new URL(request.url).searchParams.get("status");
  if (status && !["pending", "approved", "rejected"].includes(status)) return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
  try {
    await connectToDatabase();
    const users = await User.find(status ? { status } : {}).select("-passwordHash").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Admin users fetch failed", error);
    return NextResponse.json({ error: "Unable to load members." }, { status: 500 });
  }
}
