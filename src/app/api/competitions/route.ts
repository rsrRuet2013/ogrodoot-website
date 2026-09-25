import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { uploadMediaImage } from "@/lib/imagekit";
import { Competition } from "@/models/Competition";

export const DEFAULT_COMPETITIONS = [
  {
    _id: "comp-urc",
    title: "University Rover Challenge (URC)",
    organizer: "The Mars Society",
    location: "Hanksville, Utah, USA",
    year: "2024–2026",
    category: "International",
    result: "Pre-URC Contender & Testing",
    roverVersion: "Ogrodoot MKI4",
    coverPhoto: "/photots/mars_rover.jpg",
    description: "The premier global university space robotics competition at Mars Desert Research Station (MDRS).",
    status: "upcoming",
    order: 1,
  },
  {
    _id: "comp-arc",
    title: "Anatolian Rover Challenge (ARC)",
    organizer: "Space Exploration Society (UKET)",
    location: "Ankara & Cappadocia, Turkey",
    year: "2023–2025",
    category: "International",
    result: "International Finalist",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/rover.png",
    description: "Rugged obstacle traversing and extreme terrain teleoperation in challenging Mars analog quarry environments.",
    status: "completed",
    order: 2,
  },
  {
    _id: "comp-irdc",
    title: "International Rover Design Challenge (IRDC)",
    organizer: "Space Robotics Society",
    location: "Global Virtual Arena",
    year: "2023",
    category: "International",
    result: "1st in Bangladesh · 11th Worldwide",
    roverVersion: "Ogrodoot Virtual MKI3",
    coverPhoto: "/photots/Team_Ogrodoot_Cover.png",
    description: "Global aerospace engineering CAD, thermal dissipation, and astrobiology payload system design review.",
    status: "completed",
    order: 3,
  },
  {
    _id: "comp-erc",
    title: "European Rover Challenge (ERC)",
    organizer: "European Space Foundation",
    location: "Kielce, Poland",
    year: "2019",
    category: "International",
    result: "Selected European Competitor",
    roverVersion: "Ogrodoot MKI2",
    coverPhoto: "/photots/team.jpg",
    description: "Represented Bangladesh at Europe's flagship space robotics arena on the artificial Mars yard.",
    status: "completed",
    order: 4,
  },
  {
    _id: "comp-nat-1",
    title: "RUET National Tech Fest Rover Track",
    organizer: "Rajshahi University of Eng & Tech",
    location: "Rajshahi, Bangladesh",
    year: "2023",
    category: "National",
    result: "Champion",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/leads_only.JPG",
    description: "First place in the national planetary rover traverse and autonomous obstacle clearance challenge.",
    status: "completed",
    order: 5,
  },
  {
    _id: "comp-nat-2",
    title: "National Robotics Championship (IUT)",
    organizer: "Islamic University of Technology",
    location: "Gazipur, Bangladesh",
    year: "2022",
    category: "National",
    result: "Best Hardware & Chassis Design",
    roverVersion: "Ogrodoot MKI2",
    coverPhoto: "/photots/rover.png",
    description: "Awarded top honor for custom rocker-bogie differential mechanical chassis design.",
    status: "completed",
    order: 6,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    await connectToDatabase();
    const query = category ? { category } : {};
    const items = await Competition.find(query).sort({ order: 1, year: -1, createdAt: -1 }).lean();

    if (items.length > 0) {
      return NextResponse.json({ items });
    }

    // Return filtered defaults if collection is empty
    const filteredDefaults = category
      ? DEFAULT_COMPETITIONS.filter((c) => c.category === category)
      : DEFAULT_COMPETITIONS;

    return NextResponse.json({ items: filteredDefaults });
  } catch (error) {
    console.error("Competitions fetch failed, using fallback:", error);
    return NextResponse.json({ items: DEFAULT_COMPETITIONS });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
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

    if (!title || !location || !year) {
      return NextResponse.json({ error: "Title, location, and year are required." }, { status: 400 });
    }

    let coverPhoto = existingPhotoUrl || "/photots/mars_rover.jpg";
    let coverPhotoFileId = "";

    if (imageFile && imageFile.size > 0) {
      const upload = await uploadMediaImage(imageFile, "/ogrodoot-competitions");
      coverPhoto = upload.url;
      coverPhotoFileId = upload.fileId;
    }

    await connectToDatabase();
    const item = await Competition.create({
      title,
      organizer,
      location,
      year,
      category,
      result,
      roverVersion,
      coverPhoto,
      coverPhotoFileId,
      description,
      status,
      order: 0,
    });

    return NextResponse.json({ message: "Competition added successfully.", item }, { status: 201 });
  } catch (error) {
    console.error("Failed to create competition:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create competition." },
      { status: 500 }
    );
  }
}
