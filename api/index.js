import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routes/user-router.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log("Error From Database", error);
  });

const app = express();

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
