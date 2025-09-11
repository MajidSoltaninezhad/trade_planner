const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/calc", async (req, res) => {
  try {
    // آخرین رکورد از دیتابیس
    const result = await pool.query(
      "SELECT * FROM users_data ORDER BY id DESC LIMIT 1"
    );

    const row = result.rows[0];

    // حالا تبدیل به متغیر
    const first_name = row.first_name;
    const last_name = row.last_name;
    const initial_capital = Number(row.initial_capital);
    const target_capital = Number(row.target_capital);
    const daily_max_loss_limit = Number(row.daily_max_loss_limit);
    const working_days_in_month = Number(row.working_days_in_month);

    // یه محاسبه نمونه (مثلاً سود روزانه موردنیاز)
    const total_profit = target_capital - initial_capital;
    const daily_profit_goal = total_profit / working_days_in_month;

    // می‌تونی هر تعداد محاسبه دیگه هم اضافه کنی
    const resultData = {
      first_name,
      last_name,
      initial_capital,
      target_capital,
      daily_max_loss_limit,
      working_days_in_month,
      total_profit,
      daily_profit_goal,
    };

    // خروجی به فرانت یا ذخیره تو دیتابیس
    res.json(resultData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during calculation");
  }
});

module.exports = router;
