import { Router } from "express";
import { createInvite, verifyInvite } from "../controllers/invite.controller";
import rateLimiter from "../middlewares/ratelimiter.middleware";
const router = Router();

router.post("/", rateLimiter, createInvite); 
router.get("/verify", rateLimiter, verifyInvite); 

export default router;
