import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// ১. .env কনফিগারেশন লোড করা
dotenv.config();

// ২. Express অ্যাপ তৈরি করা
const app = express();
const PORT = process.env.PORT || 5000;

// ৩. Middlewares
app.use(cors());         // Frontend সংযোগের জন্য CORS
app.use(express.json()); // JSON বডি পার্স করার জন্য

// ৪. রিকোয়েস্ট লগার
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] 📡 ${req.method} ${req.url}`);
  next();
});

// ৫. বেসিক হেলথ চেক রুট
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Todo & Auth Backend Server সচল আছে!",
  });
});

// ৬. API রাউটস
app.use("/api/auth", authRoutes); // অথেনটিকেশন রাউটস (/register, /login, /me)
app.use("/api/todos", todoRoutes); // প্রটেক্টেড Todo রাউটস

// ৭. সার্ভার চালু করা
app.listen(PORT, () => {
  console.log(`=======================================`);
  console.log(`🚀 সার্ভার রানিং: http://localhost:${PORT}`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/register & /login`);
  console.log(`📋 Todo API: http://localhost:${PORT}/api/todos`);
  console.log(`=======================================`);
});
