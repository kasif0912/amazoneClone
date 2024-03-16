require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router.js");
const mongoose = require("mongoose");
require("./db/connection.js");
const DefaultData = require("./defaultData.js");
// const { connectDb } = require("./db/connection.js");
const cookieParser = require("cookie-parser");

// creating express app
const app = express();
app.use(express.json());
// app.use(cookieParser(""));
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port number ${PORT}`);
  // await connectDb();
});

app.get("/", (req, res) => {
  return res.status(200).send("hello home page");
});

DefaultData();
