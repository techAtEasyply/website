import { Router } from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/ats.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;
