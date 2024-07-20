import express from "express";
import { google, signIn, signUp } from "../controller/auth-controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/google", google);
router.post("/signIn", signIn);

export default router;
