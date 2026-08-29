import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ensureEnvironmentAdmin } from "@/lib/admin";
import { SUB_TEAMS } from "@/lib/subteams";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    await ensureEnvironmentAdmin();
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const query: Record<string, unknown> = {
      status: "approved",
      role: { $ne: "admin" },
    };
    if (adminEmail) {
      query.email = { $ne: adminEmail };
    }

    const users = await User.find(query)
      .select("name email mobile profilePicUrl subTeam memberType position linkedin studentId")
      .lean();

    const teamLeads = users.filter((user) => user.position === "Team Lead");
    const teamLead = teamLeads.length > 0 ? teamLeads[0] : null;

    const roster = users.filter((user) => user.position !== "Team Lead");

    function getPositionRank(pos: string) {
      if (pos === "Sub-team Lead") return 1;
      if (pos === "Team Lead") return 2;
      return 3;
    }

    const sections = SUB_TEAMS.map((subTeam) => ({
      subTeam,
      members: roster
        .filter((user) => user.subTeam === subTeam)
        .sort((a, b) => {
          // Primary sort: Position hierarchy (Sub-team Lead first)
          const rankA = getPositionRank(a.position);
          const rankB = getPositionRank(b.position);
          if (rankA !== rankB) {
            return rankA - rankB;
          }

          // Secondary sort: Ascending 7-digit student ID
          const idA = parseInt(a.studentId, 10) || 0;
          const idB = parseInt(b.studentId, 10) || 0;
          if (idA !== idB) {
            return idA - idB;
          }

          return (
            (a.studentId || "").localeCompare(b.studentId || "", undefined, { numeric: true }) ||
            a.name.localeCompare(b.name)
          );
        }),
    })).filter((section) => section.members.length > 0);

    return NextResponse.json({ teamLead, teamLeads, sections });
  } catch (error) {
    console.error("Team fetch failed", error);
    return NextResponse.json({ error: "Unable to load the team right now." }, { status: 500 });
  }
}
