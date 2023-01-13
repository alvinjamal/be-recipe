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
      const { id } = req.params;

      const {
        rows: [recipe],
      } = await ModelsRecipe.selectDetailRecipeById(id);

      if (!recipe) {
        return response(res, 404, false, [], "recipe not found");
      }

      response(res, 200, true, recipe, "Get data recipe success");
    } catch (error) {
      response(res, 404, false, null, " Get data recipe failed");
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
};
exports.recipeControllers = recipeControllers;
