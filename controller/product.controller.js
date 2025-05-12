const Products = require("../models/productSchema");

// get all products details
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Products.find();
    // Return the products in the response
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const individualData = await Products.findOne({ id: id });
    // console.log(individualData);
    return res.status(200).json({ message: "product by id", individualData });
  } catch (error) {
    res.status(400).json("cannot get product data");
    console.log("error" + error.message);
  }
};
module.exports = { getAllProducts, getProductById };
