import axios from "axios";

// Set your backend base URL here
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const backend = axios.create({
  baseURL: BACKEND_URL,
});


export const Invite = {
  sendInvite: (email) => backend.post("/invite", { email }),
  verifyInvite: (token) => backend.get(`/invite/verify`, { params: { token } }),
};
