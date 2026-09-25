import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SUB_TEAMS } from "@/lib/subteams";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const query: Record<string, unknown> = {
      status: "approved",
      role: { $ne: "admin" },
      memberType: "Alumni",
    };
    if (adminEmail) {
      query.email = { $ne: adminEmail };
    }

    const users = await User.find(query)
      .select("name email mobile profilePicUrl subTeam memberType position linkedin studentId")
      .lean();

    // Group alumni strictly by their sub-team, sorted by student ID (series / batch), no one mentioned at the top
    const sections = SUB_TEAMS.map((subTeam) => ({
      subTeam,
      members: users
        .filter((user) => user.subTeam === subTeam)
        .sort((a, b) => {
          // Sort numerically by student ID (e.g. 1703045, 1803021, etc.)
          const idA = parseInt(a.studentId, 10) || 0;
          const idB = parseInt(b.studentId, 10) || 0;
          if (idA !== idB) return idA - idB;

          return (
            (a.studentId || "").localeCompare(b.studentId || "", undefined, { numeric: true }) ||
            a.name.localeCompare(b.name)
          );
        }),
    })).filter((section) => section.members.length > 0);

    return NextResponse.json({ sections, totalCount: users.length });
  } catch (error) {
    console.error("Alumni fetch failed", error);
    return NextResponse.json({ error: "Unable to load alumni." }, { status: 500 });
  }
}
