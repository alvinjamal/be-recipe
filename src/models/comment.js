// const Pool = require("../config/db");

// const selectDataComment = (limit) => {
//   return Pool.query(`SELECT * FROM comment`);
// };
// const selectDataCommentId = (limit, recipe_id) => {
//   return Pool.query(`SELECT comment.id_comment,comment.comment, user_recipe.name as user_recipe, user_recipe.photo as user_recipe_photo,recipe.id as recipe_id FROM comment
//     INNER JOIN user_recipe ON comment.user_id = user_recipe.id
//     INNER JOIN recipe ON comment.recipe_id = recipe.id_recipe WHERE recipe_id = '${recipe_id}'`);
// };
// const insertDataComment = (data) => {
//   const { id_comment, user_id, comment, recipe_id } = data;
//   return Pool.query(
//     `INSERT INTO comment(id_comment,user_id,comment,recipe_id) VALUES ('${id_comment}','${user_id}','${comment}','${recipe_id}')`
//   );
// };

// module.exports = { selectDataComment, insertDataComment, selectDataCommentId };
