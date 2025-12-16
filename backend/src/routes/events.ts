import { Router } from "express";
import { subscribers } from "../sse/subscribers.js";

const eventRoutes = Router();

eventRoutes.get("/events/:code", (req, res) => {
  const { code } = req.params;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://shortener.afuwapetunde.com"
  );
  res.flushHeaders();

  if (!subscribers.has(code)) {
    subscribers.set(code, new Set());
  }

  subscribers.get(code)!.add(res);

  // Clean up when client disconnects
  req.on("close", () => {
    subscribers.get(code)?.delete(res);
    if (subscribers.get(code)?.size === 0) {
      subscribers.delete(code);
    }
  });
});

export default eventRoutes;
