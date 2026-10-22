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

    function getAlumniLeadershipRank(pos: string) {
      const p = (pos || "").trim().toLowerCase();
      if (p === "team lead") return 1;
      if (p === "co-team lead" || p === "co team lead") return 2;
      if (p === "sub-team lead" || p === "sub team lead" || p === "subteam lead") return 3;
      if (p.includes("lead") || p.includes("head") || p.includes("director")) return 4;
      return 5;
    }

    // Unified alumni list sorted by leadership hierarchy, then by student ID (series / batch)
    const alumni = [...users].sort((a, b) => {
      const rankA = getAlumniLeadershipRank(a.position);
      const rankB = getAlumniLeadershipRank(b.position);
      if (rankA !== rankB) return rankA - rankB;

      const idA = parseInt(a.studentId, 10) || 0;
      const idB = parseInt(b.studentId, 10) || 0;
      if (idA !== idB) return idA - idB;

      return (
        (a.studentId || "").localeCompare(b.studentId || "", undefined, { numeric: true }) ||
        a.name.localeCompare(b.name)
      );
    });

    // Group alumni strictly by their sub-team for backward compatibility
    const sections = SUB_TEAMS.map((subTeam) => ({
      subTeam,
      members: users
        .filter((user) => user.subTeam === subTeam)
        .sort((a, b) => {
          const rankA = getAlumniLeadershipRank(a.position);
          const rankB = getAlumniLeadershipRank(b.position);
          if (rankA !== rankB) return rankA - rankB;

          const idA = parseInt(a.studentId, 10) || 0;
          const idB = parseInt(b.studentId, 10) || 0;
          if (idA !== idB) return idA - idB;

          return (
            (a.studentId || "").localeCompare(b.studentId || "", undefined, { numeric: true }) ||
            a.name.localeCompare(b.name)
          );
        }),
    })).filter((section) => section.members.length > 0);

    return NextResponse.json({ alumni, sections, totalCount: users.length });
  } catch (error) {
    console.error("Alumni fetch failed", error);
    return NextResponse.json({ error: "Unable to load alumni." }, { status: 500 });
  }
}
