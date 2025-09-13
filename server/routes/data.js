const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_calc ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});
module.exports = router;
