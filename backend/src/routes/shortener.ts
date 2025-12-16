import { Router } from "express";
import { nanoid } from "nanoid";
import Link from "../models/Link.js";
import { recordClick } from "../jobs/recordClick.js";
import { isValidUrl } from "../utils/validator.js";
import { subscribers } from "../sse/subscribers.js";

const router = Router();
const CODE_LENGTH = 7;

router.post("/shorten", async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "URL is required" });
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  if (!isValidUrl(url))
    return res.status(400).json({ error: "URL is invalid" });

  let code: string;
  while (true) {
    code = nanoid(CODE_LENGTH);
    if (!(await Link.exists({ code }))) break;
  }
  const link = await Link.create({ code, targetUrl: url });
  res.json({ shortCode: code });
});

// redirect
router.get("/:code", async (req, res) => {
  const link = await Link.findOneAndUpdate(
    { code: req.params.code },
    { $inc: { clickCount: 1 } },
    { new: true }
  );

  if (!link) return res.sendStatus(404);

  setImmediate(() => {
    recordClick(link._id.toString(), req.ip).catch(() => {});
    const listeners = subscribers.get(link.code || "");
    if (listeners) {
      for (const res of listeners) {
        res.write(`data: ${link.clickCount}`);
      }
    }
  });

  return res.redirect(link.targetUrl);
});

export default router;
