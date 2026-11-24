import express from "express";
import {
  registerUser,
  loginUser,
  getMyProfile,
} from "../controllers/authController.js";
import { validateAuthInput } from "../middlewares/validateAuth.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ১. রেজিস্ট্রেশন রুট (Validation Middleware পার হয়ে কন্ট্রোলারে যাবে)
router.post("/register", validateAuthInput, registerUser);

// ২. লগইন রুট (Validation Middleware পার হয়ে কন্ট্রোলারে যাবে)
router.post("/login", validateAuthInput, loginUser);

// ৩. প্রোফাইল রুট (Auth Middleware দিয়ে প্রটেক্টেড)
router.get("/me", requireAuth, getMyProfile);

export default router;
