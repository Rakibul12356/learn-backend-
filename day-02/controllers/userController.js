// ==========================================
// Controller কি?
// Controller হলো মূল শেফ (Chef) বা কর্মী।
// Routing পথ দেখায়, কিন্তু সেই পথে এসে আসল কাজ (Business Logic) কে করবে?
// ডেটাবেজ থেকে ডেটা আনা, ডেটা ভ্যালিডেট করা, হিসাব-নিকাশ করা এবং
// ক্লায়েন্টকে Response পাঠানো — সব কাজ করে Controller।
// ==========================================

// ডামি ডেটা (আসল প্রোজেক্টে এটা ডেটাবেজ থেকে আসবে)
let users = [
  { id: 1, name: "Rakib", role: "Developer" },
  { id: 2, name: "Sakib", role: "Designer" },
];

// ১. সব ইউজারদের লিস্ট পাঠানো (GET /api/users)
export const getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// ২. নির্দিষ্ট আইডি দিয়ে একজন ইউজারকে খোঁজা (GET /api/users/:id)
export const getUserById = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      // যদি ইউজার না পাওয়া যায়
      return res.status(404).json({
        success: false,
        message: `ID ${userId} ওয়ালা কোনো ইউজার পাওয়া যায়নি!`,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // কোনো অনিচ্ছাকৃত এরর হলে Error Handler মিডলওয়্যারে পাঠিয়ে দেওয়া
    next(error);
  }
};

// ৩. নতুন ইউজার তৈরি করা (POST /api/users)
export const createUser = (req, res, next) => {
  try {
    const { name, role } = req.body;

    // ভ্যালিডেশন
    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "name এবং role দুটি ফিল্ডই আবশ্যক (required)!",
      });
    }

    const newUser = {
      id: users.length + 1,
      name,
      role,
    };

    users.push(newUser);

    // 201 = Created (নতুন কিছু সফলভাবে তৈরি হলে)
    res.status(201).json({
      success: true,
      message: "নতুন ইউজার সফলভাবে যোগ করা হয়েছে!",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
