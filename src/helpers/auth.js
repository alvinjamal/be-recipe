const jwt = require("jsonwebtoken");

let key = process.env.JWT_KEY;

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

const verify = async (token) => {
  const result = await jwt.verify(token, process.env.JWT_KEY);
  return result;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "24h",
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

const decodeToken = (token) => {
  var decoded = jwt.verify(token, key);
  return decoded;
};

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    },
    {
      tableName: "refresh_tokens",
      timestamps: true,
    }
  );
  return RefreshToken;
};

module.exports = { generateToken, generateRefreshToken, decodeToken, verify };
