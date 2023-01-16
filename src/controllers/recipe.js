const { resp, response } = require("../middlewares/common");
const cloudinary = require("../config/photo");
const ModelsRecipe = require("../models/recipe");
const { uuid } = require("uuidv4");

const Port = process.env.PORT;
const Host = process.env.HOST;

const recipeControllers = {
  addRecipe: async (req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "food",
      });
      req.body.photo = image.url;
      await ModelsRecipe.insert(req.body);
      return response(res, 200, true, req.body, "Insert Recipe Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Insert Recipe Fail");
    }
  },

  getDetailById: async (req, res, next) => {
    try {
      const { id_recipe } = req.params;

      const {
        rows: [recipe],
      } = await ModelsRecipe.selectRecipeById(id_recipe);

      if (!recipe) {
        return response(res, 404, false, [], "recipe not found");
      }

      response(res, 200, true, recipe, "Get data recipe success");
    } catch (error) {
      response(res, 404, false, null, " Get data recipe failed");
    }
  },

  getRecipeUser: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log("id_user", user_id);
      const result = await ModelsRecipe.getRecipeByUser(user_id);
      response(res, 200, true, result.rows, "Success Get Recipe By user");
    } catch (err) {
      response(res, 400, false, err, "Get Recipe By User Failed");
    }
  },

  getComment: async (req, res) => {
    try {
      const result = await ModelsRecipe.getComents(req.params.id_recipe);
      response(res, 200, true, result.rows, "Get comment success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, "Get comment fail");
    }
  },

  getRecipe: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const sortby = req.query.sortby || "title";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await ModelsRecipe.selectDataRecipe(
        page,
        limit,
        sortby,
        sort,
        search
      );
      response(res, 200, true, result.rows, "Get Data Success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Get Data Fail");
    }
  },

  addSaveRecipe: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.saveRecipes(req.body, user_id);

      response(res, 200, true, result.rows, "Post save recipe success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Post save recipe fail");
    }
  },

  addComment: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const recipe_id = req.params.id_recipe;
      const data = {
        recipe_id,
        comment: req.body.comment,
      };
      console.log(data);
      await ModelsRecipe.insertComment(user_id, data);
      response(res, 200, true, data, "Insert Comment Success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Insert Comment Failed");
    }
  },

  postLike: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.postLikeRecipe(req.body, user_id);
      response(res, 200, true, result.rows, "Post like success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Post like fail");
    }
  },

  getSaved: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.getSavedRecipe(user_id);
      response(res, 200, true, result.rows, "Get saved recipe success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Get saved recipe false");
    }
  },

  getLike: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.getLikeRecipe(user_id);
      response(res, 200, true, result.rows, "Get like success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Get like fail");
    }
  },

  deleteSaved: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.deleteSavedRecipe(
        user_id,
        req.params.id_saved
      );
      response(res, 200, true, result.rows, "Delete save recipe success");
    } catch (err) {
      response(res, 404, false, err, "Delete saved recipe fail");
    }
  },

  deleteLike: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.deleteLikeRecipe(
        user_id,
        req.params.id_liked
      );
      response(res, 200, true, result.rows, "Delete like success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Delete like fail");
    }
  },

  editRecipe: async (req, res) => {
    try {
      const {
        photo: [photo],
        video: [video],
      } = req.files;
      const { title, ingredients } = req.body;
      req.body.photo = photo.path;
      req.body.video = video.path;
      const data = { title, ingredients, photo, video };
      await ModelsRecipe.editRecipes(req.params.id_recipe, data);
      return response(res, 200, true, req.body, "Update Recipe Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Update Recipe Fail");
    }
  },

  // sort: async (req, res, next) => {
  //   try {
  //     const page = Number(req.query.page) || 1;
  //     const limit = Number(req.query.limit) || 10;
  //     const offset = (page - 1) * limit;
  //     const sortby = req.query.sortby || "title";
  //     const sort = req.query.sort || "asc";
  //     const search = req.query.search || "";
  //     const result = await ModelsRecipe.sort(
  //       limit,
  //       offset,
  //       sort,
  //       sortby,
  //       search
  //     );
  //     response(res, 200, true, result.rows, "get data success");
  //   } catch (err) {
  //     console.log(err);
  //     response(res, 404, false, err, "get data fail");
  //   }
  // },

  deleteRecipe: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log(user_id);
      const result = await ModelsRecipe.deleteRecipes(
        user_id,
        req.params.id_recipe
      );
      response(res, 200, true, result.rows, "Delete recipe success");
    } catch (err) {
      response(res, 404, false, err, "Delete recipe fail");
    }
  },
};
exports.recipeControllers = recipeControllers;
