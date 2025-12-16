import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import shortenerRoutes from "./routes/shortener.js";
import eventRoutes from "./routes/events.js";

const connectionURI = process.env.MONGO_URI || "";

try {
  await mongoose.connect(connectionURI);
  console.log("Connected!");
} catch (err) {
  console.log(err);
}
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", shortenerRoutes);
app.use("/", eventRoutes);

app.listen(3000, () => {
  console.log("Server running on :3000");
});
