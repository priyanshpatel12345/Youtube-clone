import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  deleteUser,
  getUser,
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

export default router;
