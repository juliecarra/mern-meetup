const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    var categories = await Category.find().exec();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json(error);
  }
};
