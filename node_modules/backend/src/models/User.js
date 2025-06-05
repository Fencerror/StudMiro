const db = require("../config/db");

exports.findByEmail = async (email) => {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

exports.create = async ({ email, password }) => {
  const res = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, password]
  );
  return res.rows[0];
};
