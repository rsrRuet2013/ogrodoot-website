import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { uploadMediaImage } from "@/lib/imagekit";
import { Event } from "@/models/Event";

const DEFAULT_UPCOMING = {
  _id: "default-upcoming-1",
  title: "Mars Rover Engineering Seminar & RUET Recruitment Workshop",
  description:
    "An interactive seminar and recruitment session introducing prospective student engineers to planetary robotics, subteam architectures, ROS2 autonomy, and live rover field demonstrations.",
  date: "November 14, 2026",
  location: "Central Auditorium, RUET",
  status: "upcoming",
  coverPhoto: "/photots/mars_rover.jpg",
  coverPhotoFileId: "",
  registrationLink: "https://forms.gle/ogrodoot-workshop-2026",
  caption: "Annual Student Recruitment & Hands-on Robotics Workshop",
  category: "Seminar",
};

const DEFAULT_COMPLETED = [
  {
    _id: "default-past-1",
    title: "Autonomous Navigation & ROS2 Hands-on Workshop",
    description: "Intensive 3-day technical training on LiDAR point clouds, SLAM mapping, and micro-ROS microcontroller interfacing for RUET engineering students.",
    date: "July 2025",
    location: "CSE Seminar Room, RUET",
    status: "completed",
    coverPhoto: "/photots/leads_only.JPG",
    coverPhotoFileId: "",
    registrationLink: "",
    caption: "Technical training on autonomy stacks and perception pipelines.",
    category: "Workshop",
  },
  {
    _id: "default-past-2",
    title: "Space Exploration & Astrobiology Symposium",
    description: "Inter-departmental colloquium exploring biosignature detection methods, soil chemical assays, and planetary geology.",
    date: "February 2024",
    location: "ME Conference Hall, RUET",
    status: "completed",
    coverPhoto: "/photots/team.jpg",
    coverPhotoFileId: "",
    registrationLink: "",
    caption: "Featuring presentations on Mars analog soil chemistry and optical spectroscopy.",
    category: "Symposium",
  },
  {
    _id: "default-past-3",
    title: "Rocker-Bogie Chassis Fabrication & CAD Bootcamp",
    description: "Hands-on chassis prototyping, CNC milling, and finite element stress analysis for aspiring rover builders.",
    date: "October 2023",
    location: "Central Machine Shop, RUET",
    status: "completed",
    coverPhoto: "/photots/rover.png",
    coverPhotoFileId: "",
    registrationLink: "",
    caption: "Hardware prototyping and chassis machining bootcamp.",
    category: "Bootcamp",
  },
  {
    _id: "default-past-4",
    title: "Youth STEM & Space Robotics Outreach",
    description: "Live rover demonstrations and inspirational aerospace talks for local high school and college students.",
    date: "May 2023",
    location: "Rajshahi Collegiate School",
    status: "completed",
    coverPhoto: "/photots/Team_Ogrodoot_Cover.png",
    coverPhotoFileId: "",
    registrationLink: "",
    caption: "Inspiring the next generation of aerospace engineers in northern Bangladesh.",
    category: "Outreach",
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    const upcoming = await Event.findOne({ status: "upcoming" }).sort({ createdAt: -1 }).lean();
    const completed = await Event.find({ status: "completed" }).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      upcoming: upcoming || DEFAULT_UPCOMING,
      completed: completed.length > 0 ? completed : DEFAULT_COMPLETED,
    });
  } catch (error) {
    console.error("Events fetch failed, returning fallback:", error);
    return NextResponse.json({
      upcoming: DEFAULT_UPCOMING,
      completed: DEFAULT_COMPLETED,
    });
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
    const description = String(formData.get("description") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const status = String(formData.get("status") ?? "completed").trim();
    const registrationLink = String(formData.get("registrationLink") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();
    const category = String(formData.get("category") ?? "Event").trim();
    const file = formData.get("coverPhoto");

    if (!title || !description || !date || !location) {
      return NextResponse.json({ error: "Title, description, date, and location are required." }, { status: 400 });
    }

    if (!["upcoming", "completed"].includes(status)) {
      return NextResponse.json({ error: "Status must be upcoming or completed." }, { status: 400 });
    }

    let coverPhoto = "";
    let coverPhotoFileId = "";

    if (file instanceof File && file.size > 0) {
      const uploadRes = await uploadMediaImage(file, "/ogrodoot-events");
      coverPhoto = uploadRes.url;
      coverPhotoFileId = uploadRes.fileId;
    } else {
      const coverPhotoUrl = String(formData.get("coverPhotoUrl") ?? "").trim();
      if (coverPhotoUrl) {
        coverPhoto = coverPhotoUrl;
      } else {
        coverPhoto = "/photots/mars_rover.jpg";
      }
    }

    await connectToDatabase();

    // If marked as upcoming, optionally demote previous upcoming events to completed so there is strictly one upcoming
    if (status === "upcoming") {
      await Event.updateMany({ status: "upcoming" }, { $set: { status: "completed" } });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      status,
      coverPhoto,
      coverPhotoFileId,
      registrationLink,
      caption,
      category,
    });

    return NextResponse.json({ event, message: "Event created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Event creation failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create event." },
      { status: 500 }
    );
  }
}
