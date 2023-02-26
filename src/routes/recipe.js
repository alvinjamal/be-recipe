const express = require("express");
const router = express.Router();
const { recipeControllers } = require("../controllers/recipe");
const upload = require("../middlewares/upload-video");
const { protect } = require("../middlewares/auth");
// const { sizeUpload } = require("../middlewares/upload-video");

// GET
router.get("/", recipeControllers.getRecipe);
router.get("/like-recipe", protect, recipeControllers.getLike);
router.get("/saved-recipe", protect, recipeControllers.getSaved);
router.get("/recipe-user", protect, recipeControllers.getRecipeUser);
router.get("/detail/:id_recipe", protect, recipeControllers.getDetailById);

router.get("/comment/:id_recipe", protect, recipeControllers.getComment);

// POST
router.post(
  "/add-recipe",
  protect,
  upload,
  recipeControllers.addRecipe,
  function (req, res) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://food-recipe-alvinjamal.vercel.app"
    );
    res.header("Access-Control-Allow-Credentials", true);
  }
);
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
router.delete("/delete/:id_recipe", recipeControllers.deleteRecipe);
router.delete(
  "/like-recipe/delete/:id_liked",
  protect,
  recipeControllers.deleteLike
);

module.exports = router;
