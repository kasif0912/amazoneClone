const jwt = require("jsonwebtoken");
const keysecret = process.env.KEY;

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, keysecret, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  console.log(token);
  const decodedToken = jwt.verify(token, keysecret);
  // console.log(decodedToken.userId);
  return decodedToken.userId;
};
module.exports = {generateToken, getUserIdFromToken};
