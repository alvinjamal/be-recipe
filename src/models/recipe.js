const Pool = require("../config/db");
const { use } = require("../routes/recipe");

const insert = (user_id, data) => {
  const { title, ingredients, photo, video } = data;
  return Pool.query(
    `INSERT INTO recipe(title, ingredients, photo, video, user_id)VALUES('${title}','${ingredients}','${photo}','${video}','${user_id}')`
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

const insertComment = (user_id, data) => {
  const { comment, recipe_id } = data;
  new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO comment(comment,user_id,recipe_id)VALUES('${comment}','${user_id}',${recipe_id})`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const getRecipeByUser = (user_id) => {
  return Pool.query(`SELECT * FROM recipe WHERE user_id = '${user_id}'`);
};

const getSelectSave = (user_id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT saved_recipe.id_saved,saved_recipe.user_id,saved_recipe.recipe_id,recipe.title,recipe.photo FROM saved_recipe INNER JOIN recipe ON saved_recipe.recipe_id=recipe.id_recipe WHERE saved_recipe.user_id='${user_id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getComents = (id_recipe) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT comment.id_comment,comment.comment,comment.user_id,comment.recipe_id,users.fullname,users.photo FROM comment INNER JOIN users ON comment.user_id=users.id_user WHERE comment.recipe_id=${id_recipe}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const saveRecipes = ({ recipe_id }, user_id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO saved_recipe(user_id,recipe_id) VALUES ('${user_id}',${recipe_id})`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const postLikeRecipe = ({ recipe_id }, user_id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO liked_recipe(user_id,recipe_id)VALUES('${user_id}',${recipe_id})`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getLikeRecipe = (user_id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT liked_recipe.id_liked,liked_recipe.user_id,liked_recipe.recipe_id,recipe.title,recipe.photo FROM liked_recipe INNER JOIN recipe ON liked_recipe.recipe_id=recipe.id_recipe WHERE liked_recipe.user_id='${user_id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteSavedRecipe = (user_id, id_saved) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `DELETE FROM saved_recipe WHERE id_saved=${id_saved} AND user_id='${user_id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteLikeRecipe = (user_id, id_liked) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `DELETE FROM liked_recipe WHERE id_liked=${id_liked} AND user_id='${user_id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const editRecipes = (id_recipe, data) => {
  const { title, ingredients, photo, video } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE recipe SET title='${title}',ingredients='${ingredients}',photo='${photo}',video='${video}' WHERE id_recipe='${id_recipe}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

// const sort = (limit, offset, sort, sortby, search) => {
//   console.log(limit, offset, sort, sortby);
//   return Pool.query(
//     `SELECT * FROM recipe WHERE title ILIKE ('%${search}%')
//     ORDER BY recipe.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `
//   );
// };

const deleteRecipes = (id_recipe) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `DELETE FROM recipe WHERE id_recipe=${id_recipe}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  insert,
  selectRecipeById,
  selectDataUser,
  selectDataRecipe,
  insertComment,
  postLikeRecipe,
  getRecipeUser,
  // sort,
  saveRecipes,
  getComents,
  getLikeRecipe,
  getRecipeByUser,
  getSelectSave,
  getRecipeUser,
  editRecipes,
  deleteSavedRecipe,
  deleteLikeRecipe,
  deleteRecipes,
};
