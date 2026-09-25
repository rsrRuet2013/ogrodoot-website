import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { uploadMediaImage } from "@/lib/imagekit";
import { MediaItem } from "@/models/MediaItem";

const DEFAULT_MEDIA_ITEMS = [
  {
    _id: "default-media-1",
    title: "National Rover Design Challenge Win",
    caption: "The Daily Star feature: Team Ogrodoot clinches #1 in Bangladesh and 11th Worldwide.",
    imageUrl: "/photots/Team_Ogrodoot_Cover.png",
    imageFileId: "",
    source: "The Daily Star Tech Review",
    date: "November 2023",
    category: "Newspaper Clipping",
  },
  {
    _id: "default-media-2",
    title: "Anatolian Rover Challenge (ARC) Field Operations",
    caption: "Frontline test of cycloidal planetary arm and extreme terrain Rocker-Bogie chassis.",
    imageUrl: "/photots/rover.png",
    imageFileId: "",
    source: "Aerospace & Robotics Journal",
    date: "August 2025",
    category: "Competition Feature",
  },
  {
    _id: "default-media-3",
    title: "Martian Analog Field Trials in RUET",
    caption: "Prothom Alo Science & Tech: RUET engineers simulate Martian soil extraction.",
    imageUrl: "/photots/mars_rover.jpg",
    imageFileId: "",
    source: "Prothom Alo Science",
    date: "July 2024",
    category: "Press Release",
  },
  {
    _id: "default-media-4",
    title: "Leadership & Avionics Architecture Review",
    caption: "Dhaka Tribune: Student researchers pioneering open-source ROS2 space robotics in Bangladesh.",
    imageUrl: "/photots/leads_only.JPG",
    imageFileId: "",
    source: "Dhaka Tribune",
    date: "October 2023",
    category: "Newspaper Clipping",
  },
  {
    _id: "default-media-5",
    title: "Full Team Roster & Mission Send-Off",
    caption: "RUET campus reception honoring Team Ogrodoot's international qualifications.",
    imageUrl: "/photots/team.jpg",
    imageFileId: "",
    source: "RUET News Bulletin",
    date: "March 2025",
    category: "Institutional Press",
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    const items = await MediaItem.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({
      items: items.length > 0 ? items : DEFAULT_MEDIA_ITEMS,
    });
  } catch (error) {
    console.error("Media fetch failed, returning fallback:", error);
    return NextResponse.json({ items: DEFAULT_MEDIA_ITEMS });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();
    const source = String(formData.get("source") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const category = String(formData.get("category") ?? "Press Feature").trim();
    const file = formData.get("image");

    let imageUrl = "";
    let imageFileId = "";

    if (file instanceof File && file.size > 0) {
      const uploadRes = await uploadMediaImage(file, "/ogrodoot-media");
      imageUrl = uploadRes.url;
      imageFileId = uploadRes.fileId;
    } else {
      const manualUrl = String(formData.get("imageUrl") ?? "").trim();
      if (!manualUrl) {
        return NextResponse.json({ error: "An image file or image URL is required." }, { status: 400 });
      }
      imageUrl = manualUrl;
    }

    await connectToDatabase();
    const mediaItem = await MediaItem.create({
      title,
      caption,
      imageUrl,
      imageFileId,
      source,
      date,
      category,
    });

    return NextResponse.json({ item: mediaItem, message: "Media clipping uploaded successfully." }, { status: 201 });
  } catch (error) {
    console.error("Media upload failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to upload media item." },
      { status: 500 }
    );
  }
}
