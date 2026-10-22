import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { deleteImageKitFile, uploadMediaImage } from "@/lib/imagekit";
import { Event } from "@/models/Event";

async function admin() {
  const session = await getSession();
  return session?.role === "admin" ? session : null;
}

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  return handleUpdate(request, context);
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return handleUpdate(request, context);
}

async function handleUpdate(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await admin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const { id } = await context.params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid event ID." }, { status: 400 });

  try {
    await connectToDatabase();
    const existing = await Event.findById(id);
    if (!existing) return NextResponse.json({ error: "Event not found." }, { status: 404 });

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const title = (formData.get("title") as string)?.trim();
      const description = (formData.get("description") as string)?.trim();
      const date = (formData.get("date") as string)?.trim();
      const location = (formData.get("location") as string)?.trim();
      const status = (formData.get("status") as string)?.trim();
      const registrationLink = (formData.get("registrationLink") as string)?.trim();
      const caption = (formData.get("caption") as string)?.trim();
      const category = (formData.get("category") as string)?.trim();
      const file = formData.get("coverPhoto");
      const coverPhotoUrl = (formData.get("coverPhotoUrl") as string)?.trim();

      if (title) existing.title = title;
      if (description) existing.description = description;
      if (date) existing.date = date;
      if (location) existing.location = location;
      if (status && ["upcoming", "completed"].includes(status)) {
        if (status === "upcoming") {
          await Event.updateMany({ _id: { $ne: id }, status: "upcoming" }, { $set: { status: "completed" } });
        }
        existing.status = status;
      }
      if (registrationLink !== undefined) existing.registrationLink = registrationLink;
      if (caption !== undefined) existing.caption = caption;
      if (category !== undefined) existing.category = category;

      if (file instanceof File && file.size > 0) {
        if (existing.coverPhotoFileId) {
          await deleteImageKitFile(existing.coverPhotoFileId).catch(() => {});
        }
        const uploadRes = await uploadMediaImage(file, "/ogrodoot-events");
        existing.coverPhoto = uploadRes.url;
        existing.coverPhotoFileId = uploadRes.fileId;
      } else if (coverPhotoUrl) {
        existing.coverPhoto = coverPhotoUrl;
      }

      await existing.save();
      return NextResponse.json({ event: existing, message: "Event updated successfully." });
    } else {
      // JSON body
      const body = (await request.json()) as Record<string, any>;

      if (body.status === "upcoming") {
        await Event.updateMany({ _id: { $ne: id }, status: "upcoming" }, { $set: { status: "completed" } });
      }

      const event = await Event.findByIdAndUpdate(id, { ...body, updatedAt: new Date() }, { new: true });
      return NextResponse.json({ event, message: "Event updated successfully." });
    }
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
      await deleteImageKitFile(event.coverPhotoFileId).catch(() => {});
    }

    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("Event delete failed:", error);
    return NextResponse.json({ error: "Unable to delete event." }, { status: 500 });
  }
}
