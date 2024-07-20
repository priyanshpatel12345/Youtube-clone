import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
} from "../controller/comment-controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/addComment", verifyToken, createComment);

router.delete("/deleteComment/:id", verifyToken, deleteComment);

router.get("/getComments/:videoId", verifyToken, getAllComments);

export default router;
