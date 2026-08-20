import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { deleteImageKitFile, uploadProfileImage } from "@/lib/imagekit";
import { validateRegistration } from "@/lib/validation";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let uploadedFileId: string | undefined;
  try {
    const data = await request.formData();
    const profilePicture = data.get("profilePicture");
    const values = {
      name: String(data.get("name") ?? ""), studentId: String(data.get("studentId") ?? ""), email: String(data.get("email") ?? "").toLowerCase(),
      mobile: String(data.get("mobile") ?? ""), password: String(data.get("password") ?? ""), subTeam: String(data.get("subTeam") ?? ""), memberType: String(data.get("memberType") ?? ""),
      position: String(data.get("position") ?? ""), linkedin: String(data.get("linkedin") ?? ""),
    };
    const error = validateRegistration(values);
    if (error) return NextResponse.json({ error }, { status: 400 });
    if (!(profilePicture instanceof File) || profilePicture.size === 0) return NextResponse.json({ error: "A profile picture is required." }, { status: 400 });

    await connectToDatabase();
    const existing = await User.exists({ $or: [{ email: values.email.trim() }, { studentId: values.studentId.trim() }] });
    if (existing) return NextResponse.json({ error: "An account already uses that email address or student ID." }, { status: 409 });

    // Private ImageKit credentials are used only here on the server; the browser never receives them.
    const image = await uploadProfileImage(profilePicture);
    uploadedFileId = image.fileId;
    await User.create({
      ...values, name: values.name.trim(), studentId: values.studentId.trim(), email: values.email.trim(), mobile: values.mobile.trim(), position: values.position.trim(), linkedin: values.linkedin.trim(),
      passwordHash: await bcrypt.hash(values.password, 12), profilePicUrl: image.url, profilePicFileId: image.fileId,
      role: "member", status: "pending",
    });
    return NextResponse.json({ message: "Registration received. Your account is pending admin approval." }, { status: 201 });
  } catch (error) {
    if (uploadedFileId) await deleteImageKitFile(uploadedFileId).catch(() => undefined);
    if (typeof error === "object" && error && "code" in error && error.code === 11000) return NextResponse.json({ error: "An account already uses that email address or student ID." }, { status: 409 });
    console.error("Registration failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to register right now." }, { status: 500 });
  }
}
