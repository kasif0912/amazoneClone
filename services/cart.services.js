// const Cart = require("../models/cart.model");
// const CartItem = require("../models/cartItem.model");
// const Products = require("../models/productSchema");


// // function for creating cart of individual user
// async function createCart(user) {
//   try {
//     const cart = new Cart({ user });
//     const createdCart = await cart.save();
//     return createdCart;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
// // function  to find userCart details
// async function findUserCart({ userId }) {
//   try {
//     let cart = await Cart.findOne(userId);
//     // console.log(cart);

//     let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
//     cart.cartItems = cartItems;

//     let totalPrice = 0;
//     let totalDiscountedPrice = 0;
//     let totalItem = 0;

//     for (let cartItem of cart.cartItems) {
//       totalPrice += cartItem.price;
//       totalDiscountedPrice += cartItem.discountedPrice;
//       totalItem += cartItem.quantity;
//     }

//     cart.totalPrice = totalPrice;
//     cart.totalItem = totalItem;
//     cart.totalDiscountedPrice = totalDiscountedPrice;
//     cart.discounts = totalPrice - totalDiscountedPrice;
//     return cart;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// // function for  add items to cart
// async function addCartItem(userId, req) {
//   console.log(req.id);
//   try {
//     const cart = await Cart.findOne({ user: userId });
//     console.log("Cart:", cart);
//     const product = await Products.findOne(req.id);
//     console.log(product);
//     // console.log("hiii")
//     const isPresent = await CartItem.findOne({
//       cart: cart._id,
//       product: product._id,
//       userId,
//     });

//     if (!isPresent) { 
//       const cartItem = new CartItem({
//         product: product._id,
//         cart: cart._id,
//         quantity: 1,
//         userId,
//         size: req.size,
//       });

//       const createdCartItem = await cartItem.save();
//       cart.cartItems.push(createdCartItem);
//       await cart.save();
//       return "Item added to cart";
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// module.exports = { createCart, findUserCart, addCartItem };
