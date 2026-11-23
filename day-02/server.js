import express from "express";
import { requestLogger } from "./middlewares/logger.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 5001; // Day 02 টেস্টের জন্য পোর্ট 5001 রাখা হলো

// ১. Built-in Middleware: JSON বডি পার্স করার জন্য
app.use(express.json());

// ২. Application-level Custom Middleware: সব রিকোয়েস্ট লগ করবে
app.use(requestLogger);

// ৩. Routing: /api/users সম্পর্কিত সব রিকোয়েস্ট userRoutes হ্যান্ডেল করবে
app.use("/api/users", userRoutes);

// ৪. টেস্ট এরর রুট (Error Handler টেস্ট করার জন্য)
app.get("/error-test", (req, res, next) => {
  // ইচ্ছাকৃতভাবে একটি এরর তৈরি করা হলো
  const testError = new Error("এটি একটি টেস্ট এরর!");
  testError.statusCode = 500;
  next(testError); // next()-এ কোনো আর্গুমেন্ট পাস করলে Express সরাসরি Error Handler-এ চলে যায়!
});

// ৫. 404 Not Found Middleware (সব রুটের শেষে রাখতে হয়)
app.use(notFoundHandler);

// ৬. Global Error Handler Middleware (একদম সবার শেষে রাখতে হয়!)
app.use(errorHandler);

// ৭. সার্ভার স্টার্ট
app.listen(PORT, () => {
  console.log(`🚀 Day 02 Demo Server চলছে: http://localhost:${PORT}`);
});
