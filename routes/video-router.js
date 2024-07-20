import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideo,
  search,
  subVideo,
  tagByVideo,
  trendVideo,
  updateVideo,
} from "../controller/video-controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/createVideo", verifyToken, addVideo);

router.put("/updateVideo/:id", verifyToken, updateVideo);

router.delete("/deleteVideo/:id", verifyToken, deleteVideo);

router.get("/getVideo/:id", verifyToken, getVideo);

// Increment views of  Video
router.put("/viewVideo/:id", addView);

router.get("/trendVideo", trendVideo);

router.get("/randomVideo", randomVideo);

router.get("/subVideo", verifyToken, subVideo);

router.get("/tagVideo", tagByVideo);

router.get("/randomVideo", randomVideo);

router.get("/search", search);

export default router;
