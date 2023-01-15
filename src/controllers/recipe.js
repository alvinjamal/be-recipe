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

  getRecipeUser: (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || "id";
    const sort = req.query.sort || "DESC";
    const search = req.query.search || "";
    const user_recipe = req.payload.id;

    ModelsRecipe.selectDataUser(
      limit,
      offset,
      sort,
      sortby,
      search,
      page,
      user_recipe
    )
      .then((result) =>
        response(res, 200, true, result.rows, "get data sukses")
      )
      .catch((err) => response(res, 401, false, err.message, "get data fail"));
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

  delete: (req, res, next) => {
    ModelsRecipe.deleteRecipe(req.params.id_recipe)
      .then((result) =>
        response(res, 200, true, result.rows, "Delete data succsess")
      )
      .catch((err) => response(res, 401, false, err, "Delete data fail"));
  },
};
exports.recipeControllers = recipeControllers;
