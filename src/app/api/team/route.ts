import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ensureEnvironmentAdmin } from "@/lib/admin";
import { SUB_TEAMS, getTeamBySlug } from "@/lib/subteams";
import { User } from "@/models/User";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    await ensureEnvironmentAdmin();
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const query: Record<string, unknown> = {
      status: "approved",
      role: { $ne: "admin" },
      memberType: { $ne: "Alumni" },
    };
    if (adminEmail) {
      query.email = { $ne: adminEmail };
    }

    const users = await User.find(query)
      .select("name email mobile profilePicUrl subTeam memberType position linkedin studentId")
      .lean();

    // Overall Leadership (Team Leads and Co-Team Leads, or Management)
    const overallLeads = users
      .filter(
        (user) =>
          user.position === "Team Lead" ||
          user.position === "Co-Team Lead" ||
          user.subTeam === "Management"
      )
      .sort((a, b) => {
        const getRank = (pos: string) => {
          if (pos === "Team Lead") return 1;
          if (pos === "Co-Team Lead") return 2;
          return 3;
        };
        const rA = getRank(a.position);
        const rB = getRank(b.position);
        if (rA !== rB) return rA - rB;

        const idA = parseInt(a.studentId, 10) || 0;
        const idB = parseInt(b.studentId, 10) || 0;
        if (idA !== idB) return idA - idB;
        return a.name.localeCompare(b.name);
      });

    const teamLeadsOnly = overallLeads.filter((u) => u.position === "Team Lead");
    const coTeamLeadsOnly = overallLeads.filter((u) => u.position === "Co-Team Lead");
    const teamLead = overallLeads.length > 0 ? overallLeads[0] : null;

    // Per-team breakdown for the 5 subteams
    const teams = SUB_TEAMS.map((subTeam) => {
      const teamUsers = users.filter((u) => u.subTeam === subTeam);

      // Leadership for this specific sub-team (only Sub-team Leads, not overall executive team leads)
      const leaders = teamUsers
        .filter((u) => u.position === "Sub-team Lead")
        .sort((a, b) => {
          const idA = parseInt(a.studentId, 10) || 0;
          const idB = parseInt(b.studentId, 10) || 0;
          if (idA !== idB) return idA - idB;
          return a.name.localeCompare(b.name);
        });

      // Regular team members of this sub-team (excluding sub-team leads and overall team leads)
      const members = teamUsers
        .filter(
          (u) =>
            u.position !== "Sub-team Lead" &&
            u.position !== "Team Lead" &&
            u.position !== "Co-Team Lead"
        )
        .sort((a, b) => {
          const idA = parseInt(a.studentId, 10) || 0;
          const idB = parseInt(b.studentId, 10) || 0;
          if (idA !== idB) return idA - idB;

          return (
            (a.studentId || "").localeCompare(b.studentId || "", undefined, { numeric: true }) ||
            a.name.localeCompare(b.name)
          );
        });

      return {
        subTeam,
        leaders,
        members,
        allMembers: teamUsers,
        totalCount: teamUsers.length,
      };
    });

    // Backward-compatible sections format
    function getPositionRank(pos: string) {
      if (pos === "Sub-team Lead") return 1;
      if (pos === "Co-Team Lead") return 2;
      if (pos === "Team Lead") return 3;
      return 4;
    }

    const roster = users.filter((user) => user.position !== "Team Lead" && user.position !== "Co-Team Lead");
    const sections = SUB_TEAMS.map((subTeam) => ({
      subTeam,
      members: roster
        .filter((user) => user.subTeam === subTeam)
        .sort((a, b) => {
          const rankA = getPositionRank(a.position);
          const rankB = getPositionRank(b.position);
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

    // Check if client requested a specific team or slug
    const url = new URL(request.url);
    const slugQuery = url.searchParams.get("slug");
    const subTeamQuery = url.searchParams.get("subTeam");

    if (slugQuery) {
      const meta = getTeamBySlug(slugQuery);
      if (meta) {
        const teamData = teams.find((t) => t.subTeam === meta.subTeam);
        return NextResponse.json({
          meta,
          team: teamData || { subTeam: meta.subTeam, leaders: [], members: [], allMembers: [], totalCount: 0 },
        });
      }
    } else if (subTeamQuery) {
      const teamData = teams.find((t) => t.subTeam === subTeamQuery);
      if (teamData) {
        return NextResponse.json({ team: teamData });
      }
    }

    return NextResponse.json({
      teamLead,
      teamLeads: overallLeads,
      teamLeadsOnly,
      coTeamLeadsOnly,
      overallLeads,
      teams,
      sections,
      allUsers: users,
    });
  } catch (error) {
    console.error("Team fetch failed", error);
    return NextResponse.json({ error: "Unable to load the team right now." }, { status: 500 });
  }
}
