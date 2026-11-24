# 🔌 03. API Endpoint Planning (REST API Contract)

প্রোডাকশন গ্রেড ব্যাকএন্ডের জন্য প্রতিটি এন্ডপয়েন্ট আগে থেকে স্পেসিফাই করে নেওয়া হলো:

## ১. Authentication API (`/api/auth`)

| Method | Endpoint | Description | Request Body | Auth Required | Status Code |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **POST** | `/api/auth/register` | নতুন ইউজার তৈরি | `{ username, email, password }` | ❌ No | `201 Created` |
| **POST** | `/api/auth/login` | ইউজার লগইন ও JWT টোকেন | `{ email, password }` | ❌ No | `200 OK` |
| **GET** | `/api/auth/me` | বর্তমান ইউজারের প্রোফাইল | None | ✅ Yes | `200 OK` |

---

## ২. Projects API (`/api/projects`)

| Method | Endpoint | Description | Query / Body | Auth Required | Status Code |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **GET** | `/api/projects` | ইউজারের সব প্রজেক্টের তালিকা | `?status=ACTIVE` (filter) | ✅ Yes | `200 OK` |
| **POST** | `/api/projects` | নতুন প্রজেক্ট তৈরি | `{ title, description }` | ✅ Yes | `201 Created` |
| **GET** | `/api/projects/:id` | নির্দিষ্ট প্রজেক্ট ও তার টাস্ক | None | ✅ Yes | `200 OK` |
| **PATCH** | `/api/projects/:id` | প্রজেক্টের নাম/স্ট্যাটাস এডিট | `{ title, status }` | ✅ Yes | `200 OK` |
| **DELETE**| `/api/projects/:id` | প্রজেক্ট ও সব টাস্ক ডিলিট | None | ✅ Yes | `200 OK` |

---

## ৩. Tasks API (`/api/tasks`)

| Method | Endpoint | Description | Request Body | Auth Required | Status Code |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **POST** | `/api/projects/:projectId/tasks` | প্রজেক্টে নতুন টাস্ক যোগ | `{ title, priority, dueDate }` | ✅ Yes | `201 Created` |
| **GET** | `/api/projects/:projectId/tasks` | প্রজেক্টের সব টাস্ক দেখা | `?priority=HIGH&status=TODO` | ✅ Yes | `200 OK` |
| **PATCH** | `/api/tasks/:id` | টাস্কের স্ট্যাটাস/টাইটেল এডিট | `{ status, priority }` | ✅ Yes | `200 OK` |
| **DELETE**| `/api/tasks/:id` | টাস্ক মুছে ফেলা | None | ✅ Yes | `200 OK` |

---

## ৪. স্ট্যান্ডার্ড এরর রেসপন্স ফরম্যাট:
কোনো এরর হলে ব্যাকএন্ড থেকে সবসময় একই ফরম্যাটে রেসপন্স যাবে:
```json
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "অনুরোধ করা প্রজেক্টটি খুঁজে পাওয়া যায়নি!"
  }
}
```
