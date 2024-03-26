const Products = require("./models/productSchema");
const productsdata = require("./constant/productData");

const DefaultData = async () => {
  // console.log(productsdata);
  try {
    await Products.deleteMany({});
    const storeData = await Products.insertMany(productsdata);
    // console.log(storeData);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = DefaultData;
