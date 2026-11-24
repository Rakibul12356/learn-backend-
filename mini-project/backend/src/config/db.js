import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Supabase PostgreSQL Pool কনফিগারেশন
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Supabase ক্লাউড ডেটাবেজে কানেক্ট করার জন্য SSL আবশ্যক
  },
});

// ডেটাবেজ টেবিলগুলো স্বয়ংক্রিয়ভাবে তৈরি করার ফাংশন
export const initDB = async () => {
  try {
    const client = await pool.connect();
    console.log("🐘 Supabase PostgreSQL এর সাথে সফলভাবে সংযোগ তৈরি হয়েছে!");

    // ১. Users টেবিল তৈরি (ইউনিক ইউজারনেম সহ)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ২. Todos টেবিল তৈরি
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT FALSE,
        username VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ 'users' এবং 'todos' টেবিল রেডি আছে!");
    client.release();
  } catch (error) {
    console.error("❌ ডেটাবেজ সংযোগে সমস্যা:", error.message);
  }
};
