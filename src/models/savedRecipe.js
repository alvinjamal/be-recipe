const Pool = require("../config/db");

const selectData = (limit, recipe_id) => {
  return Pool.query(`SELECT saved_recipe.id_saved,recipe.id_recipe as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,user_recipe.id as recipe_id FROM saved_recipe 
    INNER JOIN recipe ON saved_recipe.recipe_id = recipe.id
    INNER JOIN user_recipe ON savedRecipe.user_id = recipe.id_recipe WHERE saved_recipe.recipe_id='${recipe_id}'`);
};
const insertData = (data) => {
  const { id_saved, recipe_id, user_id } = data;
  return Pool.query(
    `INSERT INTO saved_recipe(id_saved,recipe_id,user_id) VALUES ('${id_saved}','${recipe_id}','${user_id}')`
  );
};
const deleteS = (id_saved) => {
  return Pool.query(
    `DELETE FROM saved_recipe WHERE saved_recipe.id_saved='${id_saved}'`
  );
};

module.exports = { selectData, insertData, deleteS };
