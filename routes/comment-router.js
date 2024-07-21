import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controller/comment-controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/addComment", verifyToken, createComment);

router.delete("/deleteComment/:id", verifyToken, deleteComment);

router.put("/updateComment/:id", verifyToken, updateComment);

router.get("/getComments/:videoId", verifyToken, getAllComments);

export default router;
