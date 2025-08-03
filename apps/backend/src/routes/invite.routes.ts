import { Router } from "express";
import { createInvite, verifyInvite } from "../controllers/invite.controller";
import rateLimiter from "../middlewares/ratelimiter.middleware";

const router = Router();

// Join waitlist
router.post("/waitlist", rateLimiter, createInvite);

// Verify email from link
router.get("/verify", verifyInvite);



export default router;