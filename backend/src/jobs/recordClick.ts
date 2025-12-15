import crypto from "crypto";
import Click from "../models/Click.js";

export async function recordClick(linkId: string, ip?: string) {
  const ipHash = crypto
    .createHash("sha256")
    .update(ip ?? "")
    .digest("hex");

  await Click.create({ linkId, ipHash });
}
