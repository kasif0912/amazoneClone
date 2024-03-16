const USER = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwtProvider = require("../constant/jwtProvider.js");
const cartService = require("../services/cart.services.js");

const register = async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "fill the all data" });
  }

  try {
    const isUserExist = await USER.findOne({ email: email });
    if (isUserExist) {
      res.status(420).json({ error: "this user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword does not match" });
    } else {
      const user = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });
      const Createduser = await user.save();
      // console.log("created user ", Createduser._id);
      const jwt = jwtProvider.generateToken(Createduser._id);
      // console.log(jwt, "yes token generated");

      // creating cart for individual login together
      await cartService.createCart(user);

      return res
        .status(201)
        .json({ jwt, Createduser, message: "register success" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "fill all the details" });
  }
  try {
    const user = await USER.findOne({ email: email });
    // console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password...." });
    }
    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).json({ jwt, user, message: "Login Success" });
  } catch (error) {
    res.status(402).json({ error: "Can't login right now" });
  }
};
module.exports = { register, login };
