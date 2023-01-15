const { v4: uuidv4, stringify } = require("uuid");
const { response } = require("../middlewares/common");
const ModelLiked = require("../models/likeRecipe");

const LikeController = {
  get: (req, res, next) => {
    const limit = Number(req.query.limit) || 5;
    const user_id = req.payload.id;
    ModelLiked.selectData(limit, user_id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data sukses dari liked")
      )
      .catch((err) => response(res, 401, false, err, "get data fail"));
  },
  insert: (req, res, next) => {
    let data = {
      id: uuidv4(),
      recipe_id: req.body.recipe_id,
      user_id: req.body.user_id,
    };
    ModelLiked.insertData(data)
      .then((result) =>
        response(res, 200, true, result.rows, "insert data sukses")
      )
      .catch((err) => response(res, 401, false, err, "insert data fail"));
    console.log(data);
  },
  deleteS: (req, res, next) => {
    ModelLiked.deleteS(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data sukses")
      )
      .catch((err) => response(res, 401, false, err, "delete data fail"));
  },
};

exports.LikeController = LikeController;
