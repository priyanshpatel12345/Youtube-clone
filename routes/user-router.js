import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controller/user-controller.js";

const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/getUser/:id", getUser);

router.put("/subscribe/:id", verifyToken, subscribe);

router.put("/unsubscribe/:id", verifyToken, unsubscribe);

router.put("/like/:videoId", verifyToken, like);

router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
