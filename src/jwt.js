const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (payload, expiresIn = "24h") => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn }, (error, token) => {
      if (error) {
        reject(error)
      } else resolve (token)
    })
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {generateToken, verifyToken}