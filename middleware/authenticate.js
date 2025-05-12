const USER = require("../models/userSchema");
const jwtProvider = require("../constant/jwtProvider");

const authenticate = async (req, res, next) => {
  try {
    // console.log("started");z
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return req.status(404).send({ error: "token not found" });
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await USER.findById(userId);
    if (!user) {
      throw new Error("user not found with id");
    }
    console.log("user", user);
    req.token = token;
    req.user = user;
    req.userID = user._id;
    next(); 
  } catch (error) {
    res.status(401).send("Unauthorized:No token provided");
    console.log("error");
  }
};

module.exports = authenticate;
