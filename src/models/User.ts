import { Schema, model, models, type InferSchemaType } from "mongoose";
import { SUB_TEAMS } from "@/lib/subteams";
import { MEMBER_TYPES, POSITIONS } from "@/lib/member-options";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    studentId: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    mobile: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    profilePicUrl: { type: String, default: "" },
    profilePicFileId: { type: String, default: "" },
    subTeam: { type: String, required: true, enum: Array.from(SUB_TEAMS) },
    memberType: { type: String, required: true, enum: MEMBER_TYPES },
    position: { type: String, required: true, enum: POSITIONS },
    linkedin: { type: String, trim: true, default: "" },
    role: { type: String, enum: ["member", "lead", "admin"], default: "member" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ studentId: 1 }, { unique: true });

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = models.User || model("User", userSchema);
