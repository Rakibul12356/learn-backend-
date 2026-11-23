import express from "express";
// কন্ট্রোলার ফাংশনগুলো ইমপোর্ট করা হলো
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controllers/userController.js";

// ==========================================
// Routing কি?
// Routing হলো ট্রাফিক পুলিশ বা পথ নির্দেশক।
// ক্লায়েন্ট কোন URL এ কোন HTTP Method (GET, POST, etc.) নিয়ে এসেছে,
// তা দেখে সঠিক Controller ফাংশনের কাছে পৌঁছে দেওয়াই Routing এর কাজ।
// Routing নিজে কোনো ডেটা প্রসেস করে না, শুধু রাস্তা ঠিক করে দেয়।
// ==========================================

const router = express.Router();

// ১. GET /api/users -> getAllUsers কন্ট্রোলারে যাবে
router.get("/", getAllUsers);

// ২. GET /api/users/:id -> getUserById কন্ট্রোলারে যাবে
router.get("/:id", getUserById);

// ৩. POST /api/users -> createUser কন্ট্রোলারে যাবে
router.post("/", createUser);

export default router;
