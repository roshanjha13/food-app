const productModel = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  const products = await productModel.find().lean();
  res.status(200).json(products);
};

exports.getAllProductsByCategory = async (req, res) => {
  const { category } = req.query;
  const products = await productModel.find({ category }).lean();
  res.status(200).json(products);
};

exports.getSingleProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json(product);
};

exports.createProducts = async (req, res) => {
  const { name, heading, description, images, price, category } = req.body;
  const product = await productModel.create({
    name,
    heading,
    description,
    category,
    images,
    price,
  });
  res.status(201).json(product);
};
