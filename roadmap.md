# 🚀 30-Day Backend Development Learning Roadmap

**Learning Path:** Beginner → Intermediate → Practical Project → Production Deployment  
**Technology Stack:** `Node.js` · `Express.js` · `PostgreSQL` · `Prisma ORM` · `JWT` · `Zod` · `Next.js` · `Coolify`

---

## 📅 WEEK 01 — Backend Fundamentals & SQL (Day 01–07)

> **🎯 Goal:** Backend-এর মৌলিক বিষয়, Express.js এবং SQL Database সম্পর্কে পরিষ্কার ধারণা তৈরি করা।

| Day | Learning Topic | Practical Tasks |
|:---:|:---|:---|
| **01** | HTTP, REST & Node.js Setup | `npm init`, Express install, First Route, Nodemon, ES Modules, `dotenv` |
| **02** | Express.js Fundamentals | Routing, Middleware, Request/Response, Error Handler |
| **03** | PostgreSQL & SQL Basics | PostgreSQL/Neon Setup, `CREATE`, `INSERT`, `SELECT`, `WHERE` |
| **04** | SQL Keys & Relationships | Primary Key, Foreign Key, One-to-Many, Many-to-Many |
| **05** | SQL JOIN | `INNER JOIN`, `LEFT JOIN`, Joining 3 Tables |
| **06** | SQL Aggregate Functions | `GROUP BY`, `COUNT`, `SUM`, `HAVING`, `ORDER BY`, `LIMIT` |
| **07** | Weekly Revision & Mini Project | Build a Basic Todo API Using In-Memory Data |

> **✨ Weekly Outcome:** Express.js দিয়ে Basic API তৈরি এবং SQL-এর মাধ্যমে Database Operations করতে পারবে।

---

## 📅 WEEK 02 — Prisma ORM & Database Design (Day 08–14)

> **🎯 Goal:** Proper Database Design এবং Prisma ORM ব্যবহার করে বাস্তব API তৈরি শেখা।

| Day | Learning Topic | Practical Tasks |
|:---:|:---|:---|
| **08** | Project Planning & Database Design | ER Diagram, Database Structure, API Endpoint Planning |
| **09** | Prisma Setup | Prisma Installation, `schema.prisma`, User & Project Models, Migration |
| **10** | Prisma CRUD Operations | Create, `findMany`, `findUnique`, Update, Delete |
| **11** | Prisma Relationships | `include`, `select`, Nested Create, Task Model |
| **12** | Project & Task API | CRUD Endpoints, Controller → Service Pattern |
| **13** | Data Validation | Zod, Request Validation, Standard Error Response |
| **14** | Weekly Revision & SQL | SQL Query Logging, Database Indexing |

> **✨ Weekly Outcome:** Prisma ORM দিয়ে Database Design, Relations এবং Complete CRUD API তৈরি করতে পারবে।

---

## 📅 WEEK 03 — Authentication & Real-World Features (Day 15–21)

> **🎯 Goal:** Secure Authentication System এবং Real-world Backend Features তৈরি করা।

| Day | Learning Topic | Practical Tasks |
|:---:|:---|:---|
| **15** | User Registration & Password Security | bcrypt, Password Hashing, Register API |
| **16** | JWT Authentication | Login API, Access Token, Authentication Middleware |
| **17** | Refresh Token & Cookies | HTTP-only Cookie, Refresh Token Flow, Logout |
| **18** | Role-Based Authorization | Admin/Member Roles, Ownership Verification |
| **19** | Comments & Labels | Database Models, Relationships, Nested Routes |
| **20** | Pagination, Search & Filtering | `skip`/`take`, Cursor Pagination, Search, Sorting |
| **21** | Weekly Revision & Transactions | Prisma `$transaction`, Code Refactoring |

> **✨ Weekly Outcome:** Authentication, Authorization এবং বিভিন্ন Real-world Features সহ Secure Backend তৈরি করতে পারবে।

---

## 📅 WEEK 04 — Production, Frontend Integration & Deployment (Day 22–30)

> **🎯 Goal:** Production-ready Backend তৈরি, Frontend Integration এবং Live Deployment শেখা।

| Day | Learning Topic | Practical Tasks |
|:---:|:---|:---|
| **22** | Backend Security | Helmet, CORS, Rate Limiting, SQL Injection & XSS |
| **23** | File Upload | Multer, Cloudinary / AWS S3 Integration |
| **24** | Logging & Error Handling | Pino/Morgan, Centralized Error Handler, Postman Collection |
| **25** | Backend Testing | Vitest, Supertest, Write 2–3 Tests |
| **26** | Next.js Integration | API Connection, Login Page, Protected Routes |
| **27** | Frontend Development | Project/Task List, Create, Edit, Comment UI |
| **28** | Deployment Preparation | Environment Variables, Start Script, Prisma Migrate Deploy, Seed |
| **29** | Coolify Deployment | GitHub Connection, Environment Setup, Database Connection, Live Testing |
| **30** | Final Review & Documentation | README, Code Refactoring, Weak Areas Review, Office Codebase Preparation |

> **✨ Weekly Outcome:** একটি Full-Stack Project তৈরি করে Production Server-এ Deploy করতে পারবে।

---

## 🛠️ Final Project — Project & Task Management System

৩০ দিনের শেখার বিষয়গুলো ব্যবহার করে একটি বাস্তব Project তৈরি করবে।

### 🌟 Project Features:
- [ ] User Registration & Login
- [ ] JWT Authentication
- [ ] Role-Based Authorization
- [ ] Project Create, Update & Delete
- [ ] Task Management
- [ ] Comment & Label System
- [ ] Search, Filter & Pagination
- [ ] File Upload
- [ ] Protected Dashboard
- [ ] Live Deployment

---

## ⏰ Daily Study Routine (দৈনিক রুটিন)

| Activity | Time |
|:---|:---|
| 📖 Theory & Concept Learning | ১ ঘণ্টা |
| 💻 Practical Coding | ৩ ঘণ্টা |
| 🗄️ SQL / Database Practice | ১ ঘণ্টা |
| 🔄 Revision & Problem Solving | ১ ঘণ্টা |
| **Total** | **৬ ঘণ্টা** |

---

## 🎯 Final Target (30 Days)

**তোমার লক্ষ্য হবে:**
- [ ] Backend-এর Core Concepts পরিষ্কারভাবে শেখা।
- [ ] নিজে নিজে REST API তৈরি করা।
- [ ] Database Design ও Query বুঝতে পারা।
- [ ] Secure Authentication তৈরি করা।
- [ ] Frontend ও Backend Connect করা।
- [ ] একটি Full-Stack Project Live Deploy করা।
- [ ] অফিসের Existing Backend Codebase বুঝে কাজ করার প্রস্তুতি নেওয়া।

> [!IMPORTANT]
> **Important Note:**  
> প্রতিদিন শুধু শেখার জন্য নয়, নিজে কোড লেখার জন্যও সময় রাখবে। কোনো Topic না বুঝে পরের Topic-এ চলে যাবে না। সপ্তাহের শেষ দিনগুলোতে আগের বিষয়গুলো না দেখে নিজে Implement করার চেষ্টা করবে।
