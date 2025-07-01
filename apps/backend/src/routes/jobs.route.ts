import express from "express";
import { fetchJobs } from "../controllers/job.controller";

const router = express.Router();

router.post("/", fetchJobs);

export default router;