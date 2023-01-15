const response = require("../middlewares/common");
const { getProfile } = require("./../models/profile");
const { getRecipeUser } = require("./../models/recipe");

module.exports.getProfie = async (req, res, next) => {
  try {
    const payload = req.payload;
    const {
      rows: [data],
    } = await getProfile(payload);

    delete data.password;
    return response(res, data, 200, "Get profile success");
  } catch (error) {
    console.log(error);
  }
};
module.exports.getRecipebyProfile = async (req, res, next) => {
  try {
    const payload = req.payload;
    const {
      rows: [data],
    } = await getProfile(payload);
    const { rows } = await getRecipeUser(data?.id);
    return response(res, rows, 200, "Get profile success");
  } catch (error) {
    console.log(error);
  }
};
