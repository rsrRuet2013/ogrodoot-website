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
    
    if (!(profilePicture instanceof File) || profilePicture.size === 0) {
      return NextResponse.json({ error: "A profile picture is required to complete registration." }, { status: 400 });
    }

    if (profilePicture.size > 10 * 1024 * 1024) {
      const sizeMb = (profilePicture.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        { error: `Selected photo is ${sizeMb} MB, which exceeds the 10 MB maximum limit. Please upload an image under 10 MB.` },
        { status: 400 }
      );
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(profilePicture.type)) {
      return NextResponse.json(
        { error: "Invalid photo format. Only JPG, PNG, and WebP images are supported." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    const [existingEmail, existingStudentId] = await Promise.all([
      User.exists({ email: values.email.trim() }),
      User.exists({ studentId: values.studentId.trim() }),
    ]);

    if (existingEmail && existingStudentId) {
      return NextResponse.json(
        { error: `Both the email '${values.email.trim()}' and Student ID '${values.studentId.trim()}' are already registered. Please sign in instead.` },
        { status: 409 }
      );
    }
    if (existingEmail) {
      return NextResponse.json(
        { error: `The email '${values.email.trim()}' is already registered with another account. Please sign in or use a different email.` },
        { status: 409 }
      );
    }
    if (existingStudentId) {
      return NextResponse.json(
        { error: `Student ID '${values.studentId.trim()}' is already registered with an account. If this is your ID, please contact the administrator.` },
        { status: 409 }
      );
    }

    // Private ImageKit credentials are used only here on the server; the browser never receives them.
    const image = await uploadProfileImage(profilePicture);
    uploadedFileId = image.fileId;
    
    await User.create({
      ...values,
      name: values.name.trim(),
      studentId: values.studentId.trim(),
      email: values.email.trim(),
      mobile: values.mobile.trim(),
      position: values.position.trim(),
      linkedin: values.linkedin.trim(),
      passwordHash: await bcrypt.hash(values.password, 12),
      profilePicUrl: image.url,
      profilePicFileId: image.fileId,
      role: "member",
      status: "pending",
    });

    return NextResponse.json({ message: "Registration received. Your account is pending admin approval." }, { status: 201 });
  } catch (error) {
    if (uploadedFileId) await deleteImageKitFile(uploadedFileId).catch(() => undefined);
    if (typeof error === "object" && error && "code" in error && error.code === 11000) {
      const keyPattern = (error as any).keyPattern || {};
      if (keyPattern.email) {
        return NextResponse.json({ error: "Email address is already in use by another account." }, { status: 409 });
      }
      if (keyPattern.studentId) {
        return NextResponse.json({ error: "Student ID is already registered to another account." }, { status: 409 });
      }
      return NextResponse.json({ error: "An account already uses that email address or student ID." }, { status: 409 });
    }
    console.error("Registration failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to complete registration due to an unexpected error." },
      { status: 500 }
    );
  }
}
