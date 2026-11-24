import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==========================================
// ১. ইউজার রেজিস্ট্রেশন (Prisma দিয়ে Supabase এ সেভ করা)
// ==========================================
export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Prisma দিয়ে চেক করা: এই ইউজারনেম আগেই আছে কি না (Unique Check)
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `"${username}" ইউজারনেমটি ইতিমধ্যে নেওয়া হয়েছে! দয়া করে অন্য একটি ইউনিক Username নির্বাচন করুন।`,
      });
    }

    // Prisma দিয়ে নতুন ইউজার তৈরি করা
    const newUser = await prisma.user.create({
      data: {
        username,
        password, // বাস্তব প্রজেক্টে bcrypt দিয়ে হ্যাশ করে রাখবেন
      },
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "অভিনন্দন! Supabase ডেটাবেজে রেজিস্ট্রেশন সফল হয়েছে।",
      data: {
        user: { id: newUser.id, username: newUser.username },
        token,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "সার্ভারে সমস্যা হয়েছে!",
    });
  }
};

// ==========================================
// ২. ইউজার লগইন (Prisma দিয়ে ভেরিফাই করা)
// ==========================================
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Prisma দিয়ে ইউজার খোঁজা
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `"${username}" নামের কোনো ব্যবহারকারী পাওয়া যায়নি! প্রথমে রেজিস্টার করুন।`,
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "সফলভাবে লগইন হয়েছে!",
      data: {
        user: { id: user.id, username: user.username },
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "সার্ভারে সমস্যা হয়েছে!",
    });
  }
};

// ==========================================
// ৩. বর্তমান ইউজারের প্রোফাইল
// ==========================================
export const getMyProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};
