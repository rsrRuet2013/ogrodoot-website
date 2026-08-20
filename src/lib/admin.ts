import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { SUB_TEAMS } from "@/lib/subteams";

/** Creates the env-configured administrator once, on the first login attempt. */
export async function ensureEnvironmentAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const name = process.env.ADMIN_NAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !name || !password) return;
  if (await User.exists({ email })) return;
    await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    studentId: `ADMIN-${email}`,
    mobile: "Not applicable",
    subTeam: SUB_TEAMS[0],
    position: "Team Lead",
    memberType: "Current Student",
    role: "admin",
    status: "approved",
  });
}
