import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { deleteImageKitFile, uploadMediaImage } from "@/lib/imagekit";
import { Competition } from "@/models/Competition";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return handleUpdate(request, context);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return handleUpdate(request, context);
}

async function handleUpdate(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { id } = await context.params;

  try {
    await connectToDatabase();
    const existing = await Competition.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Competition not found." }, { status: 404 });
    }

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const title = (formData.get("title") as string)?.trim();
      const organizer = (formData.get("organizer") as string)?.trim() || "";
      const location = (formData.get("location") as string)?.trim();
      const year = (formData.get("year") as string)?.trim();
      const category = (formData.get("category") as string)?.trim() || "International";
      const result = (formData.get("result") as string)?.trim() || "";
      const roverVersion = (formData.get("roverVersion") as string)?.trim() || "";
      const description = (formData.get("description") as string)?.trim() || "";
      const status = (formData.get("status") as string) || "completed";
      const imageFile = formData.get("coverPhoto") as File | null;
      const existingPhotoUrl = (formData.get("existingPhotoUrl") as string)?.trim();

      if (title) existing.title = title;
      existing.organizer = organizer;
      if (location) existing.location = location;
      if (year) existing.year = year;
      existing.category = category;
      existing.result = result;
      existing.roverVersion = roverVersion;
      existing.description = description;
      existing.status = status;

      if (imageFile && imageFile.size > 0) {
        if (existing.coverPhotoFileId) {
          await deleteImageKitFile(existing.coverPhotoFileId).catch(() => {});
        }
        const upload = await uploadMediaImage(imageFile, "/ogrodoot-competitions");
        existing.coverPhoto = upload.url;
        existing.coverPhotoFileId = upload.fileId;
      } else if (existingPhotoUrl) {
        existing.coverPhoto = existingPhotoUrl;
      }

      // Mark modified and set updatedAt to now so latest updated shows first
      existing.updatedAt = new Date();
      await existing.save();
      return NextResponse.json({ message: "Competition updated successfully.", item: existing });
    } else {
      // JSON body
      const body = (await request.json()) as Record<string, any>;
      const updated = await Competition.findByIdAndUpdate(
        id,
        { ...body, updatedAt: new Date() },
        { new: true }
      );
      return NextResponse.json({ message: "Competition updated successfully.", item: updated });
    }
  } catch (error) {
    console.error("Competition update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update competition." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { id } = await context.params;

  try {
    await connectToDatabase();
    const item = await Competition.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Competition not found." }, { status: 404 });
    }

    if (item.coverPhotoFileId) {
      await deleteImageKitFile(item.coverPhotoFileId).catch(() => {});
    }

    await Competition.findByIdAndDelete(id);
    return NextResponse.json({ message: "Competition deleted successfully." });
  } catch (error) {
    console.error("Competition deletion error:", error);
    return NextResponse.json({ error: "Failed to delete competition." }, { status: 500 });
  }
}
