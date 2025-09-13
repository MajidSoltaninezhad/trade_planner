const express = require("express");
require("dotenv").config();
const router = express.Router();

const pool = require("../db");

let userData = [];
console.log("1");
router.post("/", async (req, res) => {
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
    res.json({
      message: "Data Save successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Database error" });
  }
});

module.exports = router;
