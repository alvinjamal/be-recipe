const Pool = require("../config/db");

const insert = (data) => {
  const { title, ingredients, photo, video } = data;
  return Pool.query(
    `INSERT INTO recipe(title,ingredients,photo,video)VALUES('${title}','${ingredients}','${photo}','${video}')`
  );
};
module.exports = { insert };
