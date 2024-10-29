// src/api/authAPI.js
import axios from "axios";

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export const registerUser = (userData) => authAPI.post("/auth/register", userData);
export const loginUser = (userData) => authAPI.post("/auth/iniciar-sesion", userData);
export const verifyToken = () => authAPI.get("/auth/verify");
