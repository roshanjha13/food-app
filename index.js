const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/dbConfig");
// const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");

connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To Food App</h1>");
});

app.listen(port, () => {
  console.log(` server is running on :${port}`);
});
