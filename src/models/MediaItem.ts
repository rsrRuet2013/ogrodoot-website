import { Schema, model, models, type InferSchemaType } from "mongoose";

const mediaItemSchema = new Schema(
  {
    title: { type: String, trim: true, default: "" },
    caption: { type: String, trim: true, default: "" },
    imageUrl: { type: String, required: true, trim: true },
    imageFileId: { type: String, default: "" },
    date: { type: String, trim: true, default: "" },
    source: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "Press Feature" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type MediaItemDocument = InferSchemaType<typeof mediaItemSchema>;
export const MediaItem = models.MediaItem || model("MediaItem", mediaItemSchema);
