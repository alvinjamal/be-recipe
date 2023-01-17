// const Pool = require("../config/db");

// const selectData = (limit, recipe_id) => {
//   return Pool.query(`SELECT liked_recipe.id_liked,recipe.id as recipe_id,recipe.photo as recipe_photo,recipe.title as recipe_name,recipe.id as recipe_id FROM liked_recipe
//     INNER JOIN recipe ON liked_recipe.recipe_id = recipe.id
//     INNER JOIN recipe ON liked_recipe.recipe_id = recipe.id WHERE liked_recipe.recipe_id='${recipe_id}'`);
// };
// const insertData = (data) => {
//   const { id_liked, recipe_id } = data;
//   return Pool.query(
//     `INSERT INTO liked_recipe(id_liked,recipe_id) VALUES ('${id_liked}','${recipe_id}')`
//   );
// };
// const findIdRecipe = (recipe_id) => {
//   Pool.query(`SELECT * FROM recipe_id where recipe_id='${recipe_id}'`);
// };
// const deleteS = (id_liked) => {
//   return Pool.query(
//     `DELETE FROM like_recipe WHERE liked_recipe.id_liked='${id_liked}'`
//   );
// };

// module.exports = { selectData, insertData, deleteS, findIdRecipe };
