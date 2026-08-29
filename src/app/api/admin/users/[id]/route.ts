import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { deleteImageKitFile } from "@/lib/imagekit";
import { isSubTeam } from "@/lib/subteams";
import { User } from "@/models/User";

async function admin() { const session = await getSession(); return session?.role === "admin" ? session : null; }
async function userId(context: RouteContext<"/api/admin/users/[id]">) { return (await context.params).id; }

export async function PATCH(request: Request, context: RouteContext<"/api/admin/users/[id]">) {
  if (!(await admin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const id = await userId(context);
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid member ID." }, { status: 400 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const update: Record<string, string> = {};
    if (body.status !== undefined) { 
      if (!["pending", "approved", "rejected"].includes(String(body.status))) {
        return NextResponse.json({ error: "Invalid status." }, { status: 400 }); 
      }
      update.status = String(body.status); 
    }
    if (body.subTeam !== undefined) { 
      if (!isSubTeam(String(body.subTeam))) {
        return NextResponse.json({ error: "Invalid sub-team." }, { status: 400 }); 
      }
      update.subTeam = String(body.subTeam); 
    }
    if (body.position !== undefined) { 
      const value = String(body.position).trim(); 
      if (value.length < 2 || value.length > 100) {
        return NextResponse.json({ error: "Invalid position." }, { status: 400 }); 
      }
      update.position = value; 
    }
    if (body.role !== undefined) { 
      if (!["member", "lead", "admin"].includes(String(body.role))) {
        return NextResponse.json({ error: "Invalid role." }, { status: 400 }); 
      }
      update.role = String(body.role); 
    }
    if (body.studentId !== undefined) {
      const sid = String(body.studentId).trim();
      if (!/^\d{7}$/.test(sid)) {
        return NextResponse.json({ error: "Student ID must be exactly a 7-digit number." }, { status: 400 });
      }
      update.studentId = sid;
    }
    if (!Object.keys(update).length) return NextResponse.json({ error: "No valid changes supplied." }, { status: 400 });
    
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select("-passwordHash");
    if (!user) return NextResponse.json({ error: "Member not found." }, { status: 404 });
    return NextResponse.json({ user, message: "Member updated successfully." });
  } catch (error) { 
    console.error("Member update failed", error); 
    return NextResponse.json({ error: "Unable to update member." }, { status: 500 }); 
  }
}

export async function DELETE(_request: Request, context: RouteContext<"/api/admin/users/[id]">) {
  if (!(await admin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const id = await userId(context);
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid member ID." }, { status: 400 });
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: "Member not found." }, { status: 404 });
    await deleteImageKitFile(user.profilePicFileId);
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "Member removed." });
  } catch (error) { console.error("Member removal failed", error); return NextResponse.json({ error: "Unable to remove member." }, { status: 500 }); }
}
