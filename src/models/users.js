const Pool = require("./../config/db");

const create = (data) => {
  const { id, fullname, email, password, phone, otp } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id,fullname,email,password,phone,verif,otp) VALUES('${id}','${fullname}','${email}','${password}','${phone}',0,${otp})`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verification = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const codePassword = (email, otp) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET otp='${otp}' WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const changePassword = (email, password) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET password='${password}' WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  create,
  findEmail,
  verification,
  codePassword,
  changePassword,
};
