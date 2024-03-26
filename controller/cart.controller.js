const Products = require("../models/productSchema");
const USER = require("../models/userSchema");

const addItemToCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Products.findOne({ id: id });
    // console.log(product + "cart value");

    const user = await USER.findOne({ _id: req.userID });
    // console.log("user get success",user);
    if (!user) {
      return res.status(402).json({ message: "user not found" });
    }
    const cartData = await user.addcartdata(product);
    await user.save();
    console.log("successfully added", user);
    return res.status(201).json(user);
  } catch (error) {
    console.log("error.message");
  }
};

const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    req.user.carts = req.user.carts.filter((curval) => {
      return curval.id != id;
    });
    req.user.save();
    res.status(201).json(req.user);
    console.log("item removed successfully");
  } catch (error) {
    res.status(400).json(req.user);
  }
};
const cartdetails = async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.carts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addItemToCart, removeItem, cartdetails };
