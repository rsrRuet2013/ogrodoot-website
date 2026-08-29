import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { uploadProfileImage, deleteImageKitFile } from "@/lib/imagekit";
import { User } from "@/models/User";

const URL_REGEX = /^https:\/\/(www\.)?linkedin\.com\/.+/i;

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });
  try {
    await connectToDatabase();
    const user = await User.findById(session.userId)
      .select("name email studentId mobile linkedin profilePicUrl subTeam memberType position role status createdAt")
      .lean();
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Fetch profile failed", error);
    return NextResponse.json({ user: null });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in to update your profile." }, { status: 401 });
  }

  let uploadedFileId: string | undefined;

  try {
    await connectToDatabase();
    const user = await User.findById(session.userId).select("+passwordHash");
    if (!user) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    const data = await request.formData();
    const name = data.get("name");
    const mobile = data.get("mobile");
    const linkedin = data.get("linkedin");
    const profilePicture = data.get("profilePicture");
    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");

    // 1. Validate and update Name
    if (name !== null) {
      const nameStr = String(name).trim();
      if (nameStr.length < 2 || nameStr.length > 100) {
        return NextResponse.json({ error: "Name must be between 2 and 100 characters." }, { status: 400 });
      }
      user.name = nameStr;
    }

    // 2. Validate and update Mobile
    if (mobile !== null) {
      const mobileStr = String(mobile).trim();
      if (mobileStr.length < 7 || mobileStr.length > 25) {
        return NextResponse.json({ error: "Enter a valid mobile number (7–25 digits)." }, { status: 400 });
      }
      user.mobile = mobileStr;
    }

    // 3. Validate and update LinkedIn
    if (linkedin !== null) {
      const linkedinStr = String(linkedin).trim();
      if (linkedinStr && !URL_REGEX.test(linkedinStr)) {
        return NextResponse.json({ error: "LinkedIn URL must be a valid linkedin.com profile URL." }, { status: 400 });
      }
      user.linkedin = linkedinStr;
    }

    // 4. Handle Profile Picture update
    if (profilePicture instanceof File && profilePicture.size > 0) {
      const image = await uploadProfileImage(profilePicture);
      uploadedFileId = image.fileId;

      // Delete previous image from ImageKit
      if (user.profilePicFileId) {
        await deleteImageKitFile(user.profilePicFileId).catch(() => undefined);
      }

      user.profilePicUrl = image.url;
      user.profilePicFileId = image.fileId;
    }

    // 5. Handle optional Password Change
    if (newPassword) {
      const newPassStr = String(newPassword);
      if (newPassStr.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
      }

      if (user.passwordHash) {
        if (!currentPassword) {
          return NextResponse.json({ error: "Current password is required to set a new password." }, { status: 400 });
        }
        const valid = await bcrypt.compare(String(currentPassword), user.passwordHash);
        if (!valid) {
          return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
        }
      }

      user.passwordHash = await bcrypt.hash(newPassStr, 12);
    }

    await user.save();

    const sanitizedUser = await User.findById(session.userId)
      .select("name email studentId mobile linkedin profilePicUrl subTeam memberType position role status")
      .lean();

    return NextResponse.json({
      user: sanitizedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    if (uploadedFileId) {
      await deleteImageKitFile(uploadedFileId).catch(() => undefined);
    }
    console.error("Profile update failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update profile." },
      { status: 500 }
    );
  }
}
