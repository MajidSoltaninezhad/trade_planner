const express = require("express");
const router = express.Router();
const pool = require("../db");

// انجام محاسبه برای یک user_id خاص
router.post("/calc/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // گرفتن داده از جدول user_req
    const userResult = await pool.query(
      `SELECT * FROM user_req ORDER BY id DESC LIMIT 1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ err: "User not found" });
    }

    const user = userResult.rows[0];

    // ==== محاسبات ====
    function generatePlan({
      first_name,
      last_name,
      initial_capital,
      target_capital,
      daily_max_loss_limit,
      working_days_in_month,
    }) {
      const full_name = `${first_name} ${last_name}`;
      const rows = [];
      let month_level = 1;
      let first_of_month_cap = Number(initial_capital);

      let profit_per_day_rate = daily_max_loss_limit / first_of_month_cap;
      let profit_per_month_rate = profit_per_day_rate * working_days_in_month;

      while (first_of_month_cap < target_capital) {
        const profit_per_day = first_of_month_cap * profit_per_day_rate;
        let profit_per_month = profit_per_day * working_days_in_month;
        let days_in_month = working_days_in_month;

        if (first_of_month_cap + profit_per_month > target_capital) {
          const remaining = target_capital - first_of_month_cap;
          days_in_month = Math.ceil(remaining / profit_per_day);
          profit_per_month = profit_per_day * days_in_month;
        }

        const last_of_month_cap = first_of_month_cap + profit_per_month;

        rows.push({
          full_name,
          month_level,
          first_of_month_cap,
          last_of_month_cap,
          profit_per_day,
          profit_per_day_rate: profit_per_day_rate,
          profit_per_month,
          profit_per_month_rate: profit_per_month_rate,
          max_lot: null,
          financial_symbol: null,
          risk_management_pip: null,
          working_days_in_month: days_in_month,
        });

        month_level++;
        first_of_month_cap = last_of_month_cap;
      }

      return rows;
    }

    // ذخیره در جدول user_calc
    const calcResult = await pool.query(
      `INSERT INTO user_calc 
       (full_name, month_level, first_of_month_cap, last_of_month_cap, profit_per_day, profit_per_day_rate,
        profit_per_month, profit_per_month_rate, max_lot, financial_symbol, risk_management_pip)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        full_name,
        month_level,
        first_of_month_cap,
        last_of_month_cap,
        profit_per_day,
        profit_per_day_rate,
        profit_per_month,
        profit_per_month_rate,
        max_lot,
        financial_symbol,
        risk_management_pip,
      ]
    );

    res.json({
      message: "Calculation done and saved",
      calc: calcResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Calculation error" });
  }
});

module.exports = router;
