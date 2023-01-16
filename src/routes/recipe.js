const express = require("express");
const router = express.Router();
const { recipeControllers } = require("../controllers/recipe");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

// GET
router.get("/", protect, recipeControllers.getRecipe);
router.get("/:id_recipe", recipeControllers.getDetailById);
router.get("/recipe-user", recipeControllers.getRecipeUser);
router.get("/saved-recipe", protect, recipeControllers.getSaved);
router.get("/like-recipe", protect, recipeControllers.getLike);
router.get("/comment/:id_recipe", recipeControllers.getComment);
// router.get("/search-recipe", recipeControllers.sort);

// POST
router.post("/add-recipe", upload.single("photo"), recipeControllers.addRecipe);
router.post("/add-comment/:id_recipe", protect, recipeControllers.addComment);
router.post(
  "/saved-recipe/post-saved/",
  protect,
  recipeControllers.addSaveRecipe
);
router.post("/like-recipe/post-like", protect, recipeControllers.postLike);

// UPDATE
// router.put("/edit-recipe/:id_recipe", upload, recipeControllers.editRecipe);

// DELETE
router.delete(
  "/saved-recipe/delete/:id_saved",
  protect,
  recipeControllers.deleteSaved
);
router.delete("/delete-recipe/:id_recipe", recipeControllers.deleteRecipe);
router.delete(
  "/like-recipe/delete/:id_liked",
  protect,
  recipeControllers.deleteLike
);

module.exports = router;
