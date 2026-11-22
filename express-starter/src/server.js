// ১. প্রয়োজনীয় প্যাকেজগুলো ইমপোর্ট করা হচ্ছে
import express from "express"; // Node.js-এর জন্য জনপ্রিয় ওয়েব ফ্রেমওয়ার্ক Express ইমপোর্ট করা হলো
import dotenv from "dotenv";   // .env ফাইল থেকে সিক্রেট/কনফিগারেশন ভ্যারিয়েবল রিড করার জন্য dotenv ইমপোর্ট

// ২. .env ফাইল লোড করা
dotenv.config(); // .env ফাইলের ভ্যালুগুলো process.env অবজেক্টের মধ্যে যুক্ত করে দেয়

// ৩. Express অ্যাপ তৈরি করা
const app = express(); // Express ফাংশনটি কল করে একটি অ্যাপ ইনস্ট্যান্স তৈরি করা হলো

// ৪. সার্ভারের পোর্ট (Port) নির্ধারণ
// যদি .env ফাইলে PORT থাকে তবে সেটি নেবে, না থাকলে ডিফল্ট হিসেবে 4000 পোর্টে চলবে
const PORT = process.env.PORT || 4000;

// ৫. Middleware সেটআপ
// ইনকামিং রিকোয়েস্টের বডিতে থাকা JSON ডেটা পার্স (parse) করে req.body-তে পাওয়ার ব্যবস্থা করে
app.use(express.json());

// ৬. Health Check Route (সার্ভার সচল আছে কিনা তা টেস্ট করার রুট)
// HTTP Method: GET, Endpoint: /api/health
app.get("/api/health", (req, res) => {
  // req (Request)  : ক্লায়েন্টের পাঠানো তথ্যাদি ধারণ করে
  // res (Response) : সার্ভার ক্লায়েন্টকে কী পাঠাবে তা নিয়ন্ত্রণ করে
  res.json({
    ok: true,
    message: "Express server is running",
    env: process.env.APP_ENV, // .env ফাইল থেকে অ্যাপ্লিকেশনের মোড (যেমন: development) দেখাবে
  });
});
app.get("/", (req, res) => {
  // req (Request)  : ক্লায়েন্টের পাঠানো তথ্যাদি ধারণ করে
  // res (Response) : সার্ভার ক্লায়েন্টকে কী পাঠাবে তা নিয়ন্ত্রণ করে
  res.json({
    ok: true,
    message: "This code is write by rakib ",
    env: process.env.APP_ENV, // .env ফাইল থেকে অ্যাপ্লিকেশনের মোড (যেমন: development) দেখাবে
  });
});

// ৭. টাস্কগুলোর তালিকা পাওয়ার Route (GET Request)
// HTTP Method: GET, Endpoint: /api/tasks
app.get("/api/tasks", (req, res) => {
  // স্ট্যাটাস কোড 200 (OK) সহ একটি ডামি টাস্ক লিস্ট JSON আকারে রেসপন্স দেওয়া হচ্ছে
  res.status(200).json([
    { id: 1, title: "Learn Express & REST", done: false },
  ]);
});

// ৮. নতুন টাস্ক তৈরি করার Route (POST Request)
// HTTP Method: POST, Endpoint: /api/tasks
app.post("/api/tasks", (req, res) => {
  // ক্লায়েন্ট (যেমন: Postman বা Frontend) যে বডি পাঠিয়েছে সেখান থেকে title বের করে নেওয়া হলো
  const { title } = req.body;

  // ভ্যালিডেশন: title পাঠানো হয়েছে কিনা অথবা শুধু ফাঁকা স্পেস কিনা তা যাচাই করা
  if (!title || !title.trim()) {
    // title না থাকলে 400 (Bad Request) স্ট্যাটাস কোড এবং এরর মেসেজ রিটার্ন করবে
    return res.status(400).json({ message: "title is required" });
  }

  // একটি নতুন টাস্ক অবজেক্ট তৈরি করা
  const newTask = {
    id: Date.now(),      // ইউনিক আইডি হিসেবে বর্তমান সময়ের টাইমস্ট্যাম্প (Timestamp) দেওয়া হলো
    title: title.trim(), // টাইটেলের আগে বা পরে থাকা অতিরিক্ত স্পেস বাদ দেওয়া হলো
    done: false,         // ডিফল্টভাবে কাজটি এখনও শেষ হয়নি (false)
  };

  // স্ট্যাটাস কোড 201 (Created) সহ নতুন তৈরি হওয়া টাস্কটি রেসপন্স হিসেবে পাঠানো হলো
  return res.status(201).json(newTask);
});

// ৯. সার্ভার চালু করা (Server Listening)
// নির্দিষ্ট পোর্টে সার্ভার চালু হবে এবং ক্লায়েন্টের রিকোয়েস্ট শোনার জন্য প্রস্তুত থাকবে
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
