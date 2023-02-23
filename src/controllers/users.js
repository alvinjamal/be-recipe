const { response } = require("../middlewares/common");
const {
  create,
  findEmail,
  verification,
  changePassword,
  getProfile,
  getData,
  getDataUsersById,
  updatePhotoUser,
} = require("../models/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, decodeToken } = require("../helpers/auth");
const cloudinary = require("../config/cloudinary");
const email = require("../middlewares/email");

const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  registerUsers: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (users) {
      return response(res, 500, false, "email already use", " register fail");
    }

    // create otp
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id_user: uuidv4(),
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      password,
      otp,
    };
    try {
      const result = await create(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == "email not sent!") {
          return response(res, 500, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: req.body.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 500, false, err, " register fail");
    }
  },

  refresh: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return resp(res, 500, false, "Email not found");
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return resp(res, 500, false, "Wrong refresh token ");
    }
    const payload = {
      email: users.email,
      role: users.role,
    };
    users.newToken = generateToken(payload);
    resp(res, 200, true, users, "Success get new token ");
  },

  login: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 500, false, null, " Email not found");
    }
    if (users.verif == 0) {
      return response(res, 500, false, null, " Email not verified");
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 500, false, null, "Wrong Password");
    }
    delete users.password;
    delete users.otp;
    delete users.verif;
    let payload = {
      id_user: users.id_user,
      email: users.email,
    };
    users.token = generateToken(payload);
    res.cookie("token", users.token, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 12,
      domain: "vercel.app",
      secure: true,
      path: "/",
      sameSite: "lax",
    });
    response(res, 200, true, users, "Login Success");
  },

  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 500, false, null, " email not found");
    }

    if (users.otp == otp) {
      const result = await verification(req.body.email);
      return response(
        res,
        200,
        true,
        result.rows,
        " verification email success"
      );
    }
    return response(
      res,
      500,
      false,
      null,
      " wrong otp please check your email"
    );
  },

  forgotPassword: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 500, false, null, " email not found");
    }
    let payload = {
      email: req.body.email,
    };
    const token = generateToken(payload);

    let text = `Hello ${users.fullname} \n please click link below to reset password {http://localhost:3500/users/forgot}/ ${token}`;
    const subject = `Reset Password`;
    let sendEmail = email(req.body.email, subject, text);
    if (sendEmail == "email not sent!") {
      return response(res, 500, false, null, "email fail");
    }
    return response(res, 200, true, email, "send email success");
  },

  resetPassword: async (req, res) => {
    const token = req.params.token;
    const decoded = decodeToken(token);
    const {
      rows: [users],
    } = await findEmail(decoded.email);
    if (!users) {
      return response(res, 500, false, null, " email not found");
    }
    let password = bcrypt.hashSync(req.body.password);
    const result = await changePassword(decoded.email, password);
    return response(res, 200, true, result.rows, " change password success");
  },

  getDataAll: async (req, res, next) => {
    try {
      const get = await getData();
      response(res, 200, true, get.rows, "Get users success");
    } catch (err) {
      response(res, 500, false, err, "Get users fail");
    }
  },

  getDetail: (req, res) => {
    const id_user = req.payload.id_user;
    getDataUsersById(id_user)
      .then((result) =>
        response(res, 200, true, result.rows, "Get detail users success")
      )
      .catch((err) =>
        response(res, 500, false, err, "Get detail users failed")
      );
  },

  profile: async (req, res, next) => {
    const { email } = req.payload.email;
    try {
      const {
        rows: [users],
      } = await findEmail(email);

      if (users === undefined) {
        res.json({
          message: "invalid token",
        });
        return;
      }

      response(res, 200, true, users, "Get data success");
    } catch (error) {
      console.log(error);
      response(res, 500, false, "Get data fail");
    }
  },

  updatePhoto: async (req, res) => {
    try {
      const id_user = req.params;
      // const image = await cloudinary.uploader.upload(req.file.path, {
      //   folder: "food",
      // });
      // req.body.photo = image.uri;
      const { photo } = req.files;
      console.log("adalah req file", req.files);
      req.body.photo = photo[0].path;
      await updatePhotoUser(id_user, req.body);
      return response(res, 200, true, req.body, "Update Photo Success");
    } catch (err) {
      console.log(err);
      return response(res, 500, false, err, "Update Photo Fail");
    }
  },

  getProfile: async (req, res, next) => {
    const email = req.payload.email;
    console.log(email);
    const {
      rows: [user],
    } = await getProfile(email);

    if (user === undefined) {
      res.json({
        message: "undefined user",
      });
      return;
    }
    delete user.password;
    return response(res, 200, true, user, "get profile success");
  },
};

exports.UsersController = UsersController;
