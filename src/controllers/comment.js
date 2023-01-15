const { v4: uuidv4, stringify } = require("uuid");
const cloudinary = require("../config/photo");
const { response } = require("../middlewares/common");
const ModelComment = require("../models/comment");

const CommentController = {
  getComment: (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    ModelComment.selectDataComment(limit)
      .then((result) =>
        response(res, 200, true, result.rows, "get data sukses dari comment")
      )
      .catch((err) => response(res, 401, false, err, "get data fail"));
  },
  getCommentById: async (req, res, next) => {
    try {
      const { id_comment } = req.params;

      const {
        rows: [comment],
      } = await ModelComment.selectDataCommentId(id_comment);

      if (!comment) {
        return response(res, 404, false, [], "Comment not found");
      }

      response(res, 200, true, comment, "Get data Comment success");
    } catch (error) {
      response(res, 404, false, null, " Get data Comment failed");
    }
  },
  insert: async (req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "food",
      });
      let data = {
        id_comment: uuidv4(),
        photo: (req.body.photo = image.url),
        user_id: req.body.user_id,
        comment_id: req.body.comment_id,
      };
      await ModelComment.insertDataComment(data);
      return response(res, 200, true, req.body, "Insert Comment Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Insert Comment Fail");
    }
  },
};

exports.CommentController = CommentController;
