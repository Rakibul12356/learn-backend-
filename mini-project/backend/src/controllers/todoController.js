import prisma from "../config/prisma.js";

// ==========================================
// ১. সব Todo পাওয়া (Prisma findMany)
// ==========================================
export const getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { id: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Get Todos Error:", error);
    return res.status(500).json({
      success: false,
      message: "টাস্কগুলো লোড করতে ব্যর্থ হয়েছে!",
    });
  }
};

// ==========================================
// ২. নতুন Todo তৈরি করা (Prisma create)
// ==========================================
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Todo-র title দেওয়া আবশ্যক!",
      });
    }

    const creatorUsername = req.user ? req.user.username : "anonymous";
    const creatorUserId = req.user ? req.user.id : null;

    // Prisma দিয়ে ডেটাবেজে নতুন টাস্ক ইনসার্ট করা
    const newTodo = await prisma.todo.create({
      data: {
        title: title.trim(),
        username: creatorUsername,
        userId: creatorUserId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Todo সফলভাবে Supabase ডেটাবেজে সংরক্ষিত হয়েছে!",
      data: newTodo,
    });
  } catch (error) {
    console.error("Create Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "টাস্ক সেভ করতে সমস্যা হয়েছে!",
    });
  }
};

// ==========================================
// ৩. Todo এডিট করা (Prisma update)
// ==========================================
export const updateTodo = async (req, res) => {
  try {
    const todoId = parseInt(req.params.id);
    const { title, done } = req.body;

    // Prisma দিয়ে টাস্ক খুঁজে বের করা
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `ID ${todoId} ওয়ালা কোনো টাস্ক পাওয়া যায়নি!`,
      });
    }

    // ⚠️ নিয়ম: সম্পন্ন হওয়া (Completed) টাস্ক এডিট করা যাবে না!
    if (todo.done && title !== undefined && title.trim() !== todo.title) {
      return res.status(400).json({
        success: false,
        message: "সম্পূর্ণ হওয়া (Completed) টাস্ক এডিট করা যাবে না! এডিট করতে হলে আগে টাস্কটি Pending করুন।",
      });
    }

    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "টাস্কের টাইটেল ফাঁকা রাখা যাবে না!",
        });
      }
      updateData.title = title.trim();
    }

    if (done !== undefined) {
      updateData.done = Boolean(done);
    }

    // Prisma দিয়ে ডেটাবেজে আপডেট
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      message: "টাস্ক সফলভাবে আপডেট করা হয়েছে!",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Update Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "টাস্ক আপডেট করতে সমস্যা হয়েছে!",
    });
  }
};

// ==========================================
// ৪. টাস্ক টগল করা (Prisma update)
// ==========================================
export const toggleCompleteTodo = async (req, res) => {
  try {
    const todoId = parseInt(req.params.id);

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `ID ${todoId} ওয়ালা কোনো টাস্ক পাওয়া যায়নি!`,
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { done: !todo.done },
    });

    return res.status(200).json({
      success: true,
      message: `টাস্কটি সফলভাবে ${updatedTodo.done ? "Complete" : "Pending"} করা হয়েছে!`,
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Toggle Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "টাস্ক স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে!",
    });
  }
};

// ==========================================
// ৫. Todo মুছে ফেলা (Prisma delete)
// ==========================================
export const deleteTodo = async (req, res) => {
  try {
    const todoId = parseInt(req.params.id);

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return res.status(200).json({
      success: true,
      message: `টাস্ক সফলভাবে ডেটাবেজ থেকে মুছে ফেলা হয়েছে!`,
      data: { id: todoId },
    });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    return res.status(404).json({
      success: false,
      message: "টাস্কটি পাওয়া যায়নি অথবা ইতিমধ্যে মুছে ফেলা হয়েছে!",
    });
  }
};
