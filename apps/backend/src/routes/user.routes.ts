import { Router } from "express";
import {
  getUserFromClerk,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/user.controller";

const router = Router();
// @ts-ignore
router.get("/me", getUserFromClerk); // GET /api/user/me
// @ts-ignore
router.post("/", createUser);
// @ts-ignore
router.put("/", updateUser);
// @ts-ignore
router.delete("/", deleteUser);
// @ts-ignore
router.get("/", getAllUsers);

export default router;
