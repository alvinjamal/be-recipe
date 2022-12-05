const Pool = require("../config/db");

const insert = (data) => {
  const { title, ingredients, photo } = data;
  return Pool.query(
    `INSERT INTO recipe(title,ingredients,photo)VALUES('${title}','${ingredients}','${photo}')`
  );
};
module.exports = insert;
