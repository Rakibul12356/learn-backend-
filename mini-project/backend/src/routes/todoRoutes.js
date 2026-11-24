import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  toggleCompleteTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ১. GET /api/todos — সব Todo দেখা (সবার জন্য উন্মুক্ত)
router.get("/", getAllTodos);

// 🔒 নিচের সব রুটে ঢোকার জন্য অবশ্যই লগইন (requireAuth) থাকতে হবে!
// ২. POST /api/todos — নতুন Todo যোগ করা
router.post("/", requireAuth, createTodo);

// ৩. PATCH /api/todos/:id — Todo এডিট করা
router.patch("/:id", requireAuth, updateTodo);

// ৪. PATCH /api/todos/:id/toggle — Complete/Incomplete টগল করা
router.patch("/:id/toggle", requireAuth, toggleCompleteTodo);

// ৫. DELETE /api/todos/:id — Todo মুছে ফেলা
router.delete("/:id", requireAuth, deleteTodo);

export default router;
