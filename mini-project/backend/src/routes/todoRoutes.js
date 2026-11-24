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

// 🔒 Todo-র সব রুটে ঢোকার জন্য অবশ্যই লগইন (requireAuth) থাকতে হবে!
// এক ইউজার অন্য ইউজারের ডেটা দেখতে বা এডিট করতে পারবে না।
router.use(requireAuth);

// ১. GET /api/todos — শুধুমাত্র বর্তমান ইউজারের Todo লিস্ট আনা
router.get("/", getAllTodos);

// ২. POST /api/todos — বর্তমান ইউজারের জন্য নতুন Todo যোগ করা
router.post("/", createTodo);

// ৩. PATCH /api/todos/:id — বর্তমান ইউজারের Todo এডিট করা
router.patch("/:id", updateTodo);

// ৪. PATCH /api/todos/:id/toggle — বর্তমান ইউজারের Todo টগল করা
router.patch("/:id/toggle", toggleCompleteTodo);

// ৫. DELETE /api/todos/:id — বর্তমান ইউজারের Todo মুছে ফেলা
router.delete("/:id", deleteTodo);

export default router;
