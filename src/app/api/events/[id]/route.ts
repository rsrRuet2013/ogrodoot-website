import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { deleteImageKitFile } from "@/lib/imagekit";
import { Event } from "@/models/Event";

async function admin() {
  const session = await getSession();
  return session?.role === "admin" ? session : null;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await admin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const { id } = await context.params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid event ID." }, { status: 400 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    await connectToDatabase();

    if (body.status === "upcoming") {
      await Event.updateMany({ _id: { $ne: id }, status: "upcoming" }, { $set: { status: "completed" } });
    }

    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
    return NextResponse.json({ event, message: "Event updated." });
  } catch (error) {
    console.error("Event update failed:", error);
    return NextResponse.json({ error: "Unable to update event." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await admin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const { id } = await context.params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid event ID." }, { status: 400 });

  try {
    await connectToDatabase();
    const event = await Event.findById(id);
    if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });

    if (event.coverPhotoFileId) {
      await deleteImageKitFile(event.coverPhotoFileId);
    }

    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted." });
  } catch (error) {
    console.error("Event delete failed:", error);
    return NextResponse.json({ error: "Unable to delete event." }, { status: 500 });
  }
}
