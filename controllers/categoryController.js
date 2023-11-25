const categoryModel = require("../models/category");
exports.createCategory = async (req, res) => {
  const { topic, category } = req.body;

  const cat = await categoryModel.create({ topic, category });
  res.status(201).json(cat);
};

exports.updateCategory = async (req, res) => {
  const { topic, category } = req.body;

  const checkTopic = await categoryModel.findOne({ topic });

  checkTopic.category.push(category);
  await checkTopic.save();

  res.status(200).json({
    message: "Category added",
    checkTopic,
  });
};
