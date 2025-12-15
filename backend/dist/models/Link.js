import mongoose, { Schema } from "mongoose";
const LinkSchema = new Schema({
    code: { type: String, unique: true, index: true },
    targetUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model("Link", LinkSchema);
//# sourceMappingURL=Link.js.map