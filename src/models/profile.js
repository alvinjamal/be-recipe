const pool = require("../config/db");

const getProfile = (id_user) => {
  console.log("Get data user From Get Profile ");
  return pool.query("SELECT * FROM users WHERE id_user=$1", [id_user]);
};

module.exports = { getProfile };
