const { response } = require("../middlewares/common");
const {
  create,
  findEmail,
  verification,
  changePassword,
  codePassword,
} = require("../models/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../helpers/auth");
const email = require("../middlewares/email");

const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  registerUsers: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    let role = req.params.role;

    if (users) {
      return response(res, 404, false, "email already use", " register fail");
    }

    // create otp
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
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
          return response(res, 404, false, null, "register fail");
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
      response(res, 404, false, err, " register fail");
    }
  },

  refresh: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email_user);
    if (!users) {
      return resp(res, 404, false, "Email not found");
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return resp(res, 404, false, "Wrong refresh token ");
    }
    const payload = {
      email_user: users.email_user,
      role_user: users.role_user,
    };
    users.newToken = generateToken(payload);
    resp(res, 200, true, users, "Success get new token ");
  },

  login: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    if (users.verif == 0) {
      return response(res, 404, false, null, " email not verified");
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, "wrong password");
    }
    delete users.password;
    delete users.otp;
    delete users.verif;
    let payload = {
      email: users.email,
      role: users.role,
    };
    users.token = generateToken(payload);
    response(res, 200, true, users, "login success");
  },

  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }

    if (users.otp == otp) {
      const result = await verification(req.body.email);
      return response(res, 200, true, result, " verification email success");
    }
    return response(
      res,
      404,
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
      return response(res, 404, false, null, " email not found");
    }

    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let data = {
      fullname: req.body.fullname,
      otp,
    };
    try {
      const result = await codePassword(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${otp}`;
        let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp code change password`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "code fail");
        }
        response(
          res,
          200,
          true,
          { email: req.body.email },
          "code success please check your email"
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, " code fail");
    }
  },

  codeResetPassword: async (req, res) => {
    const { otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, "otp fail");
    }
    if (users.otp == otp) {
      const result = await codePassword(req.body.email);
      return response(res, 200, true, result, " verification otp success");
    }
    return response(
      res,
      404,
      false,
      null,
      " wrong otp please check your email"
    );
  },

  resetPassword: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(decoded.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    let password = bcrypt.hashSync(req.body.password);
    const result = await changePassword(decoded.email, password);
    return response(res, 200, true, result, " change password email success");
  },
};

exports.UsersController = UsersController;
