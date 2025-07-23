import { Request, Response } from "express";

import * as userService from "../services/user.services";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        [key: string]: any;
      };
    }
  }
}

export const getUserFromClerk = async (req: Request, res: Response) => {
  try {
    console.log(req.auth);
    const userId = req.auth?.userId;
    const email = req.auth?.email;
    const name = req.auth?.name;
    if (!userId || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find or create user in DB
    const user = await userService.findOrCreateUser({
      id: userId,
      email,
      name,
      subscription: "free", // or set default
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

// Update user

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await userService.updateUser(userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

// Delete user

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // If you have a userService.getAllUsers, use it. Otherwise, keep direct Prisma call or implement in service.
    const users = (await userService.getAllUsers)
      ? await userService.getAllUsers()
      : [];
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch users" });
  }
};
