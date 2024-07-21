import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routes/user-router.js";
import commentRouter from "../routes/comment-router.js";
import videoRouter from "../routes/video-router.js";
import authRouter from "../routes/auth-router.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log("Error From Database", error);
  });

const __dirname = path.resolve();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/video", videoRouter);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(__dirname, "/fronted/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "fronted", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
