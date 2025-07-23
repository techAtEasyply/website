import { PrismaClient } from "@prisma/client";
import UserRepository from "../repositories/user-repositories";

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma.user);
export async function findOrCreateUser(userData: {
  id: string;
  email: string;
  name?: string;
  subscription?: string;
}) {
  try {
    let user = await userRepository.findById(userData.id);
    if (!user && userData.email) {
      user = await userRepository.findByEmail(userData.email);
    }
    if (!user) {
      user = await userRepository.create(userData);
    }
    return user;
  } catch (error: any) {
    throw new Error(`Error finding or creating user: ${error.message}`);
  }
}

export async function getAllUsers() {
  try {
    const users = await userRepository.findAll();
    return users;
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

export async function createUser(userData: any) {
  try {
    const user = await userRepository.create(userData);
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export async function getUserById(userId: string | number) {
  try {
    const user = await userRepository.findById(userId);
    return user;
  } catch (error: any) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
}

export async function deleteUser(userId: string | number) {
  try {
    await userRepository.destroy({ id: userId });
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

export async function updateUser(userId: string | number, userData: any) {
  try {
    const user = await userRepository.update({ id: userId }, userData);
    return user;
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}
