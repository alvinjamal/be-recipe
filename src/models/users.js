const Pool = require("./../config/db");

const create = (data) => {
  const { id_user, fullname, email, password, phone, otp } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id_user,fullname,email,password,phone,verif,otp) VALUES('${id_user}','${fullname}','${email}','${password}','${phone}',0,${otp})`,
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

const getProfile = (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM users WHERE email = '${email}';`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getData = () => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getDataUsersById = (id_user) => {
  console.log(id_user);
  return Pool.query(`SELECT * FROM users WHERE id_user = '${id_user}'`);
};

const updateProfile = ({ photo }, email) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE users SET photo='${photo}' WHERE email = '${email}';`,
      [photo],
      (err, result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

module.exports = {
  create,
  findEmail,
  verification,
  changePassword,
  getDataUsersById,
  getProfile,
  getData,
  updateProfile,
};
