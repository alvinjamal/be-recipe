const Pool = require("../config/db");

const insert = (data) => {
  const { title, ingredients, photo, video } = data;
  return Pool.query(
    `INSERT INTO recipe(title, ingredients, photo, video)VALUES('${title}','${ingredients}','${photo}','${video}')`
  );
};

const selectRecipeById = (id_recipe) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM recipe WHERE id_recipe = '${id_recipe}' `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

const selectDataRecipe = (page, limit, sortby, sort, search) =>
  new Promise((resolve, reject) => {
    console.log(page, limit, sort, sortby, search);
    const offset = (page - 1) * limit;
    Pool.query(
      `SELECT * FROM recipe WHERE title ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

module.exports = { insert, selectRecipeById, selectDataRecipe };
