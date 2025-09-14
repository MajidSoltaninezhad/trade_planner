const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all users : /
// GET users By ID: /:id
// PUT update user By ID: /:id
// DELETE user By ID: /:id

//POST save user : /
let userData = [];
console.log("1");
/**
 * @swagger
 * /:
 *   post:
 *     summary: save users data , and return saved data with ID
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data Save successfully"
 */
router.post("/save", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      initial_capital,
      target_capital,
      daily_max_loss_limit,
      working_days_in_month,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO user_req 
       (first_name, last_name, initial_capital, target_capital, daily_max_loss_limit, working_days_in_month)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        first_name,
        last_name,
        initial_capital,
        target_capital,
        daily_max_loss_limit,
        working_days_in_month,
      ]
    );
    res.status(200).json({
      message: "Data Save successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Database error" });
  }
});

// calculate API

//router. post("/calculateTradePlan")
router.post("/calc/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // گرفتن داده از جدول user_req
    const userResult = await pool.query(
      `SELECT * FROM user_req WHERE id = $1 LIMIT 1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ err: "User not found" });
    }

    const user = userResult.rows[0];
    console.log("User from DB:", user);

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

      let profit_per_day_rate =
        Number(daily_max_loss_limit) / first_of_month_cap;
      let profit_per_month_rate =
        profit_per_day_rate * Number(working_days_in_month);

      while (first_of_month_cap < Number(target_capital)) {
        const profit_per_day = first_of_month_cap * profit_per_day_rate;
        let profit_per_month = profit_per_day * Number(working_days_in_month);
        let days_in_month = Number(working_days_in_month);

        if (first_of_month_cap + profit_per_month > Number(target_capital)) {
          const remaining = Number(target_capital) - first_of_month_cap;
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
          user_id: user.id,
        });

        month_level++;
        first_of_month_cap = last_of_month_cap;
      }

      return rows;
    }

    const rows = generatePlan(user);
    // ذخیره در جدول user_calc

    const inserted = [];
    console.log("Generated rows:", rows);
    for (const row of rows) {
      const result = await pool.query(
        `INSERT INTO user_calc
         (full_name, month_level, first_of_month_cap, last_of_month_cap, 
          profit_per_day, profit_per_day_rate, profit_per_month, profit_per_month_rate, 
          max_lot, financial_symbol, risk_management_pip, working_days_in_month, user_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
        [
          row.full_name,
          row.month_level,
          row.first_of_month_cap,
          row.last_of_month_cap,
          row.profit_per_day,
          row.profit_per_day_rate,
          row.profit_per_month,
          row.profit_per_month_rate,
          row.max_lot,
          row.financial_symbol,
          row.risk_management_pip,
          row.working_days_in_month,
          row.user_id,
        ]
      );
      console.log("Generated rows:", rows);
      inserted.push(result.rows[0]);
      console.log("Inserted row:", result.rows[0]);
    }

    res.json({
      message: "Calculation done and saved",
      calc: inserted,
    });
  } catch (error) {
    console.error("DB Insert Error:", error); // توی لاگ Render یا کنسول لوکال میاد
    res.status(500).json({ err: error.message, detail: error.stack }); // توی مرورگر میاد
  }
});

//GET user tradePlane  : /tradePlane/:userId
router.get("/tradePlane/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const isUserExist = await pool.query(
      "SELECT id FROM user_req WHERE id = $1",
      [userId]
    );
    if (isUserExist.rows.length === 0) {
      return res.status(404).json({ error: "No user found" });
    }

    const result = await pool.query(
      "SELECT * FROM user_calc WHERE user_id = $1 ORDER BY id",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, "public", "view.html"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Database error" });
  }
});

module.exports = router;
