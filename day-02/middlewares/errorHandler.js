// ==========================================
// Error Handler কি?
// যখন অ্যাপ্লিকেশনে কোনো অজানা বা অপ্রত্যাশিত ভুল (Error) ঘটে,
// তখন সার্ভার যাতে ক্র্যাশ না করে এবং ব্যবহারকারী যাতে সুন্দর ফরম্যাটে এরর মেসেজ পায়,
// সেই দায়িত্ব পালন করে Error Handler Middleware।
//
// ⚠️ মনে রাখতে হবে: Error Handler Middleware-এ ৪টি প্যারামিটার থাকে:
// (err, req, res, next)
// ==========================================

// ৪টি প্যারামিটার থাকলে Express স্বয়ংক্রিয়ভাবে এটিকে Error Handler হিসেবে চেনে
export const errorHandler = (err, req, res, next) => {
  console.error("🔥 এরর ধরা পড়েছে:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "সার্ভারে একটি অভ্যন্তরীণ সমস্যা হয়েছে (Internal Server Error)!",
    // ডেভেলপমেন্ট মোডে স্ট্যাক ট্রেস দেখা সুবিধাজনক
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// কোনো রুট ম্যাচ না করলে (404 Not Found Handler)
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `অনুরোধ করা রুট '${req.originalUrl}' খুঁজে পাওয়া যায়নি!`,
  });
};
