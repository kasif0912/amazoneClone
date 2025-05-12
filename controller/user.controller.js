const USER = require("../models/userSchema");

const getUser = async (req, res) => {
  try {
    const validUser = await USER.findOne({ _id: req.userID });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(validUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};
module.exports = { getUser };
