const { v4: uuidv4, stringify } = require("uuid");
const { response } = require("../middlewares/common");
const Modelsaved = require("../models/savedRecipe");

const SavedControllers = {
  get: (req, res, next) => {
    const limit = Number(req.query.limit) || 5;
    const user_recipe = req.payload.id;
    Modelsaved.selectData(limit, user_recipe)
      .then((result) =>
        response(res, 200, true, result.rows, "Get data succsess from saved")
      )
      .catch((err) => response(res, 401, false, err, "Get data fail"));
  },
  insert: (req, res, next) => {
    let data = {
      id: uuidv4(),
      recipe_id: req.body.recipe_id,
      user_recipe_id: req.body.user_recipe_id,
    };

    Modelsaved.insertData(data)
      .then((result) =>
        response(res, 200, true, result.rows, "Insert data succsess")
      )
      .catch((err) => response(res, 401, false, err, "Insert data fail"));
    console.log(data);
  },
  deletes: (req, res, next) => {
    Modelsaved.deleteS(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "Delete data succsess")
      )
      .catch((err) => response(res, 401, false, err, "Delete data fail"));
  },
};

exports.SavedControllers = SavedControllers;
