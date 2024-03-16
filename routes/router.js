const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema.js");
const USER = require("../models/userSchema.js");
const authController = require("../controller/auth.controller.js");
const authenticate = require("../middleware/authenticate.js");
const cartService = require("../services/cart.services.js");


// get all product api
router.get("/getproducts", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Products.find();
    // Return the products in the response
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualData = await Products.findOne({ id: id });
    // console.log(individualData);
    return res.status(200).json(individualData);
  } catch (error) {
    res.status(400).json(individualData);
    console.log("error" + error.message);
  }
});

// register and login api
router.post("/register", authController.register);
router.post("/login", authController.login);

// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
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
    res.status(201).json(user);
  } catch (error) {
    console.log("error.message");
  }
  // const user = await req.user;
  // console.log(user._id);
  // console.log(req.body);
  // try {
  //   const cartItem = await cartService.addCartItem(user._id, req.body);
  //   return res.status(200).send(cartItem);
  // } catch (error) {
  //   return res.status(500).send({ message: "can't add item to Cart" });
  // }
});

// get cart details in buynow pagge to access cartdata
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// get valid user
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validUser = await USER.findOne({ _id: req.userID });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(validUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// for logout
// router.post("/logout",authenticate, (req, res) => {
//   // Clear the token from local storage
//   localStorage.removeItem("token"); // Assuming you're using localStorage for storing the token

//   // Respond with a success message
//   res.status(200).json({ message: "Logged out successfully" });
// });




// remove cart item
router.delete("/remove/:id", authenticate, async (req, res) => {
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
});

module.exports = router;
