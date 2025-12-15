import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ClickSchema = new Schema(
  {
    linkId: { type: Schema.Types.ObjectId, ref: "Link" },
    ipHash: String,
  },
  { timestamps: true }
);

export type Click = InferSchemaType<typeof ClickSchema>;
export default mongoose.model<Click>("Click", ClickSchema);
