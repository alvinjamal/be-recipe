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

const selectDataUser = (
  limit,
  offset,
  sort,
  sortby,
  search,
  page,
  user_recipe
) =>
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

const getRecipeUser = (id_recipe) => {
  console.log("searching Recipe from id");
  console.log("success jalankan Get recipe From profile");
  return pool.query(`SELECT * FROM recipes WHERE id_user = $1`, [id_recipe]);
};

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

const deleteRecipe = (id_recipe) => {
  return Pool.query(`DELETE FROM recipe WHERE id_recipe='${id_recipe}'`);
};

module.exports = {
  insert,
  selectRecipeById,
  selectDataUser,
  selectDataRecipe,
  getRecipeUser,
  deleteRecipe,
};
