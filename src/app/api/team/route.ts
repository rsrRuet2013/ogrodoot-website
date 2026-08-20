import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SUB_TEAMS } from "@/lib/subteams";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({ status: "approved", role: { $ne: "admin" } }).select("name email mobile profilePicUrl subTeam memberType position linkedin").lean();
    const teamLead = users.find((user) => user.position === "Team Lead") ?? null;
    const roster = teamLead ? users.filter((user) => String(user._id) !== String(teamLead._id)) : users;
    const sections = SUB_TEAMS.map((subTeam) => ({
      subTeam,
      members: roster.filter((user) => user.subTeam === subTeam).sort((a, b) => Number(b.position === "Sub-team Lead") - Number(a.position === "Sub-team Lead") || a.name.localeCompare(b.name)),
    })).filter((section) => section.members.length > 0);
    return NextResponse.json({ teamLead, sections });
  } catch (error) {
    console.error("Team fetch failed", error);
    return NextResponse.json({ error: "Unable to load the team right now." }, { status: 500 });
  }
}
