const Category = require('../models/categoryModel');

exports.createCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = await Category.create({name});
    res.status(201).json(category);
  } catch (error) {
    res.status(401).json({
      message: "Something went wrong",
    });
  }
};

// Get Category
exports.getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({
            mnessage: "Category not found",
        })
    }
}