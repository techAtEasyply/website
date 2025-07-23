import { Router } from "express";
import {
  getUserFromClerk,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/user.controller";

const router = Router();

router.get("/me", getUserFromClerk); // GET /api/user/me
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.get("/", getAllUsers);

export default router;
