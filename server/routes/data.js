const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/data", async (req, res) => {
  try {
    const userResult = await pool.query(
      "SELECT id FROM user_req ORDER BY id DESC LIMIT 1"
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "No user found" });
    }

    const userId = userResult.rows[0].id;

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
module.exports = router;
