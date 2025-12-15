import mongoose, { Schema, type InferSchemaType } from "mongoose";

const LinkSchema = new Schema(
  {
    code: { type: String, unique: true, index: true },
    targetUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Link = InferSchemaType<typeof LinkSchema>;
export default mongoose.model<Link>("Link", LinkSchema);
