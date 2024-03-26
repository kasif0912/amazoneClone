const express = require("express");
const router = new express.Router();
const authController = require("../controller/auth.controller.js");
const productController = require("../controller/product.controller.js");
const cartController = require("../controller/cart.controller.js");
const userController = require("../controller/user.controller.js");
const authenticate = require("../middleware/authenticate.js");
const stripe = require("stripe")(
  "sk_test_51OwgfASBZRhVBRtaNamK8QlK4ypKZevjpjKIuhKky56KPoVCiOgp6IqMiqgGJu7BvWfXHOd7S6e76gUepEcQYYg20091V6xyVv"
);

// get all product api
router.get("/getproducts", productController.getAllProducts);

// get individual data
router.get("/getproductsone/:id", productController.getProductById);

// register and login api
router.post("/register", authController.register);
router.post("/login", authController.login);

// get cart details in buynow pagge to access cartdata
router.get("/cartdetails", authenticate, cartController.cartdetails);

// adding the data into cart
router.post("/addcart/:id", authenticate, cartController.addItemToCart);

// remove cart item
router.delete("/remove/:id", authenticate, cartController.removeItem);

// get valid user
router.get("/getuser", authenticate, userController.getUser);

// payment api
router.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log(products);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title.longTitle,
      },
      unit_amount: product.price.cost * 100,
    },
    quantity: 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  return res.json({ id: session.id });
});

module.exports = router;

// for logout
// router.post("/logout",authenticate, (req, res) => {
//   // Clear the token from local storage
//   localStorage.removeItem("token"); // Assuming you're using localStorage for storing the token

//   // Respond with a success message
//   res.status(200).json({ message: "Logged out successfully" });
// });
