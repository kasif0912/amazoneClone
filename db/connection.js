const mongoose = require("mongoose");

const mongoDbUrl = process.env.DATABASE;

// const connectDb = () => {
//   return mongoose
//     .connect(mongoDbUrl)
//     .then(() => console.log("Database connected successfully"))
//     .catch((error) => {
//       console.log("error with connecting database");
//     });
// };
mongoose
  .connect(mongoDbUrl)
  .then(() => console.log("Database has been connected"))
  .catch((error) => console.log("error with connecting database"));
// module.exports = { connectDb };
