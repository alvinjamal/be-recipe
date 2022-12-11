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

  getDetailRecipe: (req, res, next) => {
    ModelsRecipe.selectRecipeById(req.params.id_recipe)
      .then((result) =>
        response(res, 200, true, result.rows, "Get detail recipe success")
      )
      .catch((err) => response(res, 404, false, err, "get detail recipe fail"));
  },

  getRecipe: (req, res) => {
    let data = {
      page: req.query.page || 1,
      limit: req.query.limit || 6,
      sort: req.query.sort || "asc",
      sortby: req.query.sortby || "id_recipe",
      search: req.query.search || "",
    };
    ModelsRecipe.selectDataRecipe(data)
      .then((result) =>
        response(res, 200, true, result.rows, "Get recipe success")
      )
      .catch((err) => response(res, 404, false, err, "Get recipe failed"));
  },
};
exports.recipeControllers = recipeControllers;
