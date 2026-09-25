import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { deleteImageKitFile } from "@/lib/imagekit";
import { MediaItem } from "@/models/MediaItem";

async function admin() {
  const session = await getSession();
  return session?.role === "admin" ? session : null;
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await admin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const { id } = await context.params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid media item ID." }, { status: 400 });

  try {
    await connectToDatabase();
    const item = await MediaItem.findById(id);
    if (!item) return NextResponse.json({ error: "Media item not found." }, { status: 404 });

    if (item.imageFileId) {
      await deleteImageKitFile(item.imageFileId);
    }

    await MediaItem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Media item deleted." });
  } catch (error) {
    console.error("Media delete failed:", error);
    return NextResponse.json({ error: "Unable to delete media item." }, { status: 500 });
  }
}
