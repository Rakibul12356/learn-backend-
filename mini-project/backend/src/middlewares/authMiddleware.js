import jwt from "jsonwebtoken";

// ==========================================
// Authentication Guard Middleware
// টাস্ক তৈরি, এডিট বা ডিলিট করার আগে লগইন চেক করা
// ==========================================
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ১. Authorization হেডার আছে কিনা এবং তা 'Bearer <token>' ফরম্যাটে কিনা
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "অননুমোদিত প্রবেশ (Unauthorized)! অনুগ্রহ করে প্রথমে লগইন করুন।",
    });
  }

  // ২. হেডার থেকে টোকেন আলাদা করা
  const token = authHeader.split(" ")[1];

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    // ৩. টোকেন ভেরিফাই করা
    const decoded = jwt.verify(token, JWT_SECRET);

    // ৪. ডিকোড করা ইউজার ইনফো রিকোয়েস্ট অবজেক্টে যুক্ত করা (যাতে কন্ট্রোলারে ব্যবহার করা যায়)
    req.user = decoded;

    // ৫. পরবর্তী কন্ট্রোলার বা মিডলওয়্যারে যাওয়ার অনুমতি দেওয়া
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "টোকেনটি অবৈধ বা মেয়াদ শেষ হয়ে গেছে! আবার লগইন করুন।",
    });
  }
};
