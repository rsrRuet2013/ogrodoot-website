import { Schema, model, models, type InferSchemaType } from "mongoose";

const competitionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    organizer: { type: String, trim: true, default: "" },
    location: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["International", "National"],
      default: "International",
    },
    result: { type: String, trim: true, default: "" },
    roverVersion: { type: String, trim: true, default: "" },
    coverPhoto: { type: String, required: true, trim: true },
    coverPhotoFileId: { type: String, default: "" },
    description: { type: String, trim: true, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "completed"],
      default: "completed",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type CompetitionDocument = InferSchemaType<typeof competitionSchema>;
export const Competition = models.Competition || model("Competition", competitionSchema);
