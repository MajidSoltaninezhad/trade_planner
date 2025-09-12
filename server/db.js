const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ← اینجا URL اکسترنال رو استفاده می‌کنیم
  ssl: {
    rejectUnauthorized: false // لازمه برای اکثر سرویس‌های ابری
  }
});

module.exports = pool;

