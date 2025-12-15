import mongoose, { Schema } from "mongoose";
const ClickSchema = new Schema({
    linkId: { type: Schema.Types.ObjectId, ref: "Link" },
    ipHash: String,
}, { timestamps: true });
export default mongoose.model("Click", ClickSchema);
//# sourceMappingURL=Click.js.map