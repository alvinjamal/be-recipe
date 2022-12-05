const { resp, response } = require("../middlewares/common");
const cloudinary = require("../config/photo");
const ModelRecipe = require("../models/recipe");

const Port = process.env.PORT;
const Host = process.env.HOST;
const recipeController = {
  addRecipe: async (req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "",
      });
      req.body.photo = image.url;
      await ModelRecipe.insert(req.body);
      return response(res, 200, true, req.body, "Add Photo Succes");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Add Photo Failed");
    }
  },
};
exports.recipeController = recipeController;
