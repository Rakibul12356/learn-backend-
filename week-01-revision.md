# 📚 Week 01 Revision Guide — Backend Fundamentals & PostgreSQL

> **🎯 উদ্দেশ্য:** শুক্রবার (Friday)-তে ১-২ ঘণ্টার মধ্যে Week 01-এর সবগুলো কনসেপ্ট দ্রুত রিভিশন করার জন্য সম্পূর্ণ চিটশিট ও হ্যান্ডনোট।  
> **কভার করা প্রজেক্ট:** Express.js + Prisma ORM + Supabase PostgreSQL + React Frontend Todo App.

---

## 📌 সূচিপত্র (Table of Contents)
1. [Day 01: HTTP, REST API & Node.js Basics](#1-day-01-http-rest-api--nodejs-basics)
2. [Day 02: Express.js Architecture (Route, Controller, Middleware, Error Handler)](#2-day-02-expressjs-architecture)
3. [Day 03: PostgreSQL & SQL Basics](#3-day-03-postgresql--sql-basics)
4. [Day 04: Keys, Relations & Schema Design](#4-day-04-keys-relations--schema-design)
5. [Day 05 & 06: SQL JOIN, Aggregates & Query Optimization](#5-day-05--06-sql-join--aggregates)
6. [🧠 Deep Dive: PostgreSQL Internal Architecture & Query Lifecycle](#6-deep-dive-postgresql-internal-architecture)
7. [Day 07: Mini Project Revision & Security Guard (JWT & Rules)](#7-day-07-mini-project--security-guard)
8. [⚡ Friday Quick-Quiz (ইন্টারভিউ ও সেলফ-টেস্ট প্রশ্ন)](#8-friday-quick-quiz)

---

## 1. Day 01: HTTP, REST API & Node.js Basics

### 🌐 HTTP Methods ও তাদের কাজ:
* **`GET`**: সার্ভার থেকে ডেটা পড়া বা দেখা (Read)। বডিতে কোনো ডেটা পাঠানো হয় না।
* **`POST`**: সার্ভারে নতুন ডেটা তৈরি করা (Create)।
* **`PUT`**: পুরো অবজেক্ট প্রতিস্থাপন করা (Complete Update)।
* **`PATCH`**: অবজেক্টের নির্দিষ্ট কোনো অংশ পরিবর্তন করা (Partial Update)।
* **`DELETE`**: সার্ভার থেকে কোনো ডেটা মুছে ফেলা (Delete)।

### 🔢 গুরুত্বপূর্ণ HTTP Status Codes:
* **`200 OK`**: রিকোয়েস্ট সফল হয়েছে।
* **`201 Created`**: নতুন কোনো রিসোর্স (যেমন নতুন ইউজার বা টাস্ক) সফলভাবে তৈরি হয়েছে।
* **`400 Bad Request`**: ক্লায়েন্ট ভুল ডেটা পাঠিয়েছে (ভ্যালিডেশন এরর)।
* **`401 Unauthorized`**: লগইন ছাড়া প্রটেক্টেড রুটে ঢোকার চেষ্টা।
* **`403 Forbidden`**: লগইন করা আছে কিন্তু ওই কাজে অ্যাক্সেস নেই (Permission Denied)।
* **`404 Not Found`**: অনুরোধ করা URL বা ডেটা পাওয়া যায়নি।
* **`500 Internal Server Error`**: সার্ভারের ব্যাকএন্ড কোডে অপ্রত্যাশিত কোনো সমস্যা।

### ⚙️ প্রজেক্ট সেটআপ কনসেপ্ট:
* **`npm init -y`**: `package.json` তৈরি করা।
* **`"type": "module"`**: আধুনিক ES6 `import express from "express"` চালু করার জন্য।
* **Nodemon**: কোড এডিট করে সেভ (`Ctrl + S`) করলেই সার্ভার অটো রিস্টার্ট নেওয়ার ডেভ-টুল।
* **`dotenv`**: সিক্রেট পাসওয়ার্ড ও পোর্ট `.env` ফাইলে আলাদা রাখা (`process.env.PORT`)।

---

## 2. Day 02: Express.js Architecture

Express অ্যাপ্লিকেশনে কোড ক্লিন রাখার জন্য ৪টি আলাদা স্তর থাকে:

```text
Client Request (কাস্টমার)
       ⬇️
1. [ Middlewares ]   -> সিকিউরিটি চেকপোস্ট / লগার / ভ্যালিডেশন
       ⬇️
2. [ Routes ]        -> ট্রাফিক পুলিশ (কোন URL কোন কন্ট্রোলারে যাবে)
       ⬇️
3. [ Controllers ]   -> মূল কর্মী / শেফ (Business Logic ও Database Query)
       ⬇️
4. [ Error Handler ] -> ফায়ার সেফটি (কোনো ভুল হলে নিরাপদ JSON এরর পাঠানো)
```

### উপাদানগুলোর দায়িত্ব:
1. **Middleware (`req, res, next`):**
   * কন্ট্রোলারে যাওয়ার আগে রিকোয়েস্ট চেক করে।
   * `next()` কল করলে রিকোয়েস্ট সামনে এগোয়, না দিলে সেখানেই আটকে থাকে।
2. **Routes (`express.Router()`):**
   * শুধু URL এবং মেথড ম্যাপ করে (যেমন: `router.post("/", createTodo)`).
3. **Controllers (`(req, res) => {}`):**
   * আসল প্রসেসিং ও ক্লায়েন্টকে `res.json(...)` পাঠানোর দায়িত্ব।
4. **Error Handler (`(err, req, res, next) => {}`):**
   * ৪টি প্যারামিটার থাকে। সার্ভার যাতে ক্র্যাশ না করে তা নিশ্চিত করে।

---

## 3. Day 03: PostgreSQL & SQL Basics

PostgreSQL একটি শক্তিশালী ওপেন-সোর্স রিলেশনাল ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (RDBMS)।

### মৌলিক SQL কমান্ডসমূহ:
```sql
-- ১. টেবিল তৈরি
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ২. ডেটা ইনসার্ট করা
INSERT INTO users (username) VALUES ('rakib');

-- ৩. ডেটা রিড করা
SELECT * FROM users WHERE username = 'rakib';

-- ৪. ডেটা আপডেট করা
UPDATE users SET username = 'rakib_dev' WHERE id = 1;

-- ৫. ডেটা মুছে ফেলা
DELETE FROM users WHERE id = 1;
```

---

## 4. Day 04: Keys, Relations & Schema Design

### 🔑 ডেটাবেজ Keys:
* **Primary Key (PK):** একটি টেবিলের প্রতিটি রো-কে এককভাবে চেনার ইউনিক চাবি (যেমন: `id`)। এটি কখনো `NULL` বা ডুপ্লিকেট হতে পারে না।
* **Foreign Key (FK):** অন্য একটি টেবিলের Primary Key-র সাথে সম্পর্ক স্থাপনকারী কলাম (যেমন: `todos` টেবিলে `userId` কলাম)।

### 🔗 রিলেশনশিপ প্রকারভেদ:
1. **One-to-Many (1:N):** একজন ইউজারের একাধিক টাস্ক থাকতে পারে (`User` ➔ `Todos`)।
2. **Many-to-Many (M:N):** একজন শিক্ষার্থী অনেক কোর্সে ভর্তি হতে পারে, আবার একটি কোর্সে অনেক শিক্ষার্থী থাকতে পারে (মাঝখানে একটি Junction Table লাগে)।

### 💡 Prisma Cascade Delete:
```prisma
user User? @relation(fields: [userId], references: [id], onDelete: Cascade)
```
> **অন ডিলিট ক্যাসকেড (Cascade):** যদি কোনো ইউজার ডিলিট করা হয়, ডেটাবেজ স্বয়ংক্রিয়ভাবে তার অধীনে থাকা সব টাস্কও মুছে ফেলবে।

---

## 5. Day 05 & 06: SQL JOIN & Aggregates

### 🤝 JOIN-এর ধরন:
* **`INNER JOIN`**: শুধুমাত্র দুটি টেবিল মিললে (ম্যাচিং ডেটা) রিটার্ন করে।
* **`LEFT JOIN`**: বাম টেবিলের সব ডেটা রাখবে, ডান টেবিলে ম্যাচ না থাকলে `NULL` দেখাবে।

```sql
SELECT users.username, todos.title, todos.done
FROM users
LEFT JOIN todos ON users.id = todos.userId;
```

### 📊 Aggregate Functions:
* `COUNT()`: মোট রো গণনা করা।
* `SUM()`: সংখ্যার যোগফল বের করা।
* `GROUP BY`: নির্দিষ্ট কলাম অনুযায়ী গ্রুপ করা (যেমন: কার কয়টি টাস্ক আছে)।
* `ORDER BY id DESC`: নতুন থেকে পুরনো ক্রমানুসারে সাজানো।
* `LIMIT 10`: নির্দিষ্ট সংখ্যক ডেটা আনা।

---

## 6. 🧠 Deep Dive: PostgreSQL Internal Architecture

PostgreSQL কীভাবে একটি কুয়েরি রান করে এবং ডেটা সুরক্ষিত রাখে তার ৭টি অভ্যন্তরীণ ধাপ:

```text
[QUERY] ➔ [PLANNER] ➔ [INDEX] ➔ [TRANSACTION] ➔ [MVCC] ➔ [WAL] ➔ [VACUUM]
```

1. **QUERY (কুয়েরি গ্রহণ ও পার্সিং):**
   * ক্লায়েন্ট থেকে আসা SQL চেক করে সিনট্যাক্স ঠিক আছে কি না এবং কুয়েরি ট্রি (Query Tree) তৈরি করে।
2. **PLANNER (কুয়েরি প্ল্যানার ও অপটিমাইজার):**
   * পোস্টগ্রেসের মস্তিষ্ক। একাধিক সম্ভাব্য পথের মধ্যে সবচেয়ে কম সময় ও র্যাম খরচ করে ডেটা আনার **Execution Plan** নির্ধারণ করে।
3. **INDEX (ইনডেক্সিং - B-Tree):**
   * বইয়ের সূচিপত্রের মতো। পুরো টেবিল স্ক্যান না করে সরাসরি ইনডেক্স দেখে সেকেন্ডের ভগ্নাংশে ডেটা লোকেট করে।
4. **TRANSACTION (ACID সেফটি):**
   * ট্রানজ্যাকশন সব কাজ একটি ইউনিট হিসেবে চালায়। সব ঠিক থাকলে **Commit**, ভুল হলে **Rollback**।
5. **MVCC (Multi-Version Concurrency Control):**
   * *"পড়ার লোক লেখার লোককে আটকাবে না, লেখার লোক পড়ার লোককে আটকাবে না।"*
   * একই সময়ে হাজার হাজার ক্লায়েন্ট কাজ করলেও লক হয় না। ডেটা আপডেটের সময় পুরনো ডেটা না মুছে নতুন ভার্সন তৈরি হয়।
6. **WAL (Write-Ahead Logging):**
   * আসল ডিস্কে ডেটা লেখার আগেই একটি সিকিউর লগ ফাইলে (WAL) লিখে নেওয়া হয়। বিদ্যুৎ চলে গেলে বা সার্ভার ক্র্যাশ করলেও রিস্টার্টের সময় এই লগ দেখে শতভাগ ডেটা রিকভার করা যায়।
7. **VACUUM (মেমোরি ক্লিনার):**
   * MVCC-র কারণে তৈরি হওয়া পুরনো অপ্রয়োজনীয় ডেটা (Dead Tuples / আবর্জনা) মুছে ফেলে ডেটাবেজের পারফরম্যান্স দ্রুত রাখে।

---

## 7. Day 07: Mini Project & Security Guard

### 🛡️ আমাদের প্রোজেক্টে যে বিশেষ লজিকগুলো আছে:

#### ক) Validation Middleware (`validateAuthInput`):
* `username` কমপক্ষে ৩ অক্ষর এবং `password` কমপক্ষে ৬ অক্ষরের হতে হবে। ভুল হলে কন্ট্রোলারে যাওয়ার আগেই `400 Bad Request`।

#### খ) Unique Username Constraint:
* রেজিস্ট্রেশনের সময় Prisma দিয়ে চেক করা হয় `findUnique({ where: { username } })`। আগে থাকলে ডুপ্লিকেট রেজিস্টার বন্ধ।

#### গ) JWT Auth Guard (`requireAuth`):
* টাস্ক তৈরি, এডিট বা ডিলিট করার সময় হেডারে `Authorization: Bearer <token>` চেক করে। না থাকলে `401 Unauthorized`।

#### ঘ) Business Rule:
* **"সম্পন্ন হওয়া (Completed) কোনো টাস্ক এডিট করা যাবে না!"**
* কোনো টাস্কের `done === true` থাকলে তার টাইটেল এডিট করতে গেলে ব্যাকএন্ড `400 Bad Request` দিয়ে আটকে দেয়।

---

## 8. ⚡ Friday Quick-Quiz (সেলফ টেস্ট ও ইন্টারভিউ প্রশ্ন)

শুক্রবার সকালে নিজেকে এই প্রশ্নগুলো করে উত্তর মনে করার চেষ্টা করবেন:

1. **`PATCH` এবং `PUT`-এর মধ্যে পার্থক্য কী?**
   * *উত্তর:* `PUT` পুরো অবজেক্ট নতুন করে রিপ্লেস করে, আর `PATCH` শুধুমাত্র আংশিক ফিল্ড (যেমন শুধু টাইটেল বা স্ট্যাটাস) আপডেট করে।
2. **Express-এ `next()` কল না করলে কী হবে?**
   * *উত্তর:* রিকোয়েস্ট মাঝপথে আটকে থাকবে এবং ব্রাউজারে অনন্তকাল লোডিং ঘুরবে।
3. **Primary Key এবং Foreign Key-এর সম্পর্ক কী?**
   * *উত্তর:* Primary Key টেবিলের নিজস্ব ইউনিক পরিচয়, আর Foreign Key দিয়ে অন্য টেবিলের Primary Key-র সাথে সম্পর্ক স্থাপন করা হয়।
4. **PostgreSQL-এ WAL (Write-Ahead Logging)-এর কাজ কী?**
   * *উত্তর:* ডিস্কে স্থায়ীভাবে লেখার আগে একটি লগ ফাইলে লিখে রাখা, যাতে সার্ভার ক্র্যাশ করলেও ডেটা রিকভার করা যায়।
5. **Prisma-তে `onDelete: Cascade`-এর সুবিধা কী?**
   * *উত্তর:* প্যারেন্ট ডেটা (যেমন ইউজার) ডিলিট হলে তার সাথে সম্পর্কিত সব চাইল্ড ডেটা (টাস্ক) ডেটাবেজ নিজে থেকে ডিলিট করে দেয়।

---
> 💡 **নোট:** এই ফাইলটি [week-01-revision.md](file:///c:/Users/rakib/learn-backend-/week-01-revision.md) হিসেবে আপনার রুট ফোল্ডারে সংরক্ষিত আছে। যেকোনো সময় রিভিশনের জন্য এটি খুলে দেখতে পারবেন।
