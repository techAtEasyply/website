import { Router } from "express";
import { createInvite, verifyInvite } from "../controllers/invite.controller";
import rateLimiter from "../middlewares/ratelimiter.middleware";

const router = Router();

// Join waitlist
router.post("/waitlist", rateLimiter, createInvite);
//http://backend.easyply.in/api/invite/waitlist
// Verify email from link
router.post("/verify/:token", verifyInvite);
// http://backend.easyply.in/api/invite/verify/your_token_here

export default router;
