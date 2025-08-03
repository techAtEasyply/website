import axios from "axios";

// Set your backend base URL here
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const backend = axios.create({
  baseURL: BACKEND_URL,
});

export const Waitlist = {
  // Join waitlist
  join: (email: string) => backend.post("/invite/waitlist", { email }),
  
  // Verify email token
  verify: (token: string) => backend.get(`/invite/verify?token=${token}`),
  
  // Get waitlist (admin)
  getAll: () => backend.get("/invite/waitlist"),
};

export const User = {
  getUserInfo: () => backend.get("/user/me"),
  getAllUsers: () => backend.get("/user"),
};