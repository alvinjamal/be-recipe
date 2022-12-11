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

const selectDataRecipe = (page, limit, sort, sortby, search) =>
  new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    Pool.query(
      `select * FROM recipe where (title) ilike '%${search}%' order by ${sortby} ${sort} limit ${limit} offset ${offset} `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
module.exports = { insert, selectRecipeById, selectDataRecipe };
