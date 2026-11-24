// ==========================================
// Input Validation Middleware
// কন্ট্রোলারে পৌঁছানোর আগেই username এবং password যাচাই করা
// ==========================================
export const validateAuthInput = (req, res, next) => {
  const { username, password } = req.body;

  // ১. কোনো ফিল্ড মিসিং আছে কিনা
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username এবং Password দুটি ফিল্ডই পূরণ করা আবশ্যক!",
    });
  }

  const cleanUsername = username.trim();

  // ২. Username মিনিমাম ৩ ক্যারেক্টার হতে হবে
  if (cleanUsername.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Username কমপক্ষে ৩ অক্ষরের হতে হবে!",
    });
  }

  // ৩. Password মিনিমাম ৬ ক্যারেক্টার হতে হবে
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password কমপক্ষে ৬ অক্ষরের হতে হবে!",
    });
  }

  // রিকোয়েস্ট বডিতে ট্রিম করা ইউজারনেম রাখা
  req.body.username = cleanUsername;

  // সব ঠিক থাকলে পরবর্তী ধাপে (Controller-এ) যাওয়ার অনুমতি দেওয়া
  next();
};
