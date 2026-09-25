import { Schema, model, models, type InferSchemaType } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "completed"],
      default: "completed",
    },
    coverPhoto: { type: String, required: true, trim: true },
    coverPhotoFileId: { type: String, default: "" },
    registrationLink: { type: String, trim: true, default: "" },
    caption: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "Event" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type EventDocument = InferSchemaType<typeof eventSchema>;
export const Event = models.Event || model("Event", eventSchema);
