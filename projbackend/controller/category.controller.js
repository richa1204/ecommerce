require("dotenv").config();
const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Empty category not allowed.",
      });
    }

    const categoryData = new Category(req.body);

    await categoryData
      .save()
      .then((data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            msg: "Category successfully created",
            data,
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error: "Category not created!",
        });
      });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: "Category not created",
    });
  }
};

exports.getCategory = (req, res) => {
  try {
    const { _id } = req.body;
    Category.findOne({ _id }, (err, category) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err: "No category found...",
        });
      }

      if (!category) {
        return res.status(400).json({
          success: false,
          err: "No category found...",
        });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      err: "No user found...",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(400).json({
        success: false,
        err: "No category found...",
      });
    }
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      err: "No category found...",
    });
  }
};

exports.updateCategory = async (req, res) => {
  Category.findOne({ _id: req.body._id }, async (err, category) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err: "No category found...",
      });
    }

    if (req.body.name) {
      category.name = req.body.name;
    }

    const updatedData = await Category.findOneAndUpdate(
      { _id: req.body._id },
      category,
      (err, category) => {
        if (err) {
          return res.status(400).json({
            success: false,
            err: "No category found...",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Category data successfully updated",
        });
      }
    );
  });
};

exports.deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    await Category.findOneAndDelete({ _id }).then((category, err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Category not deleted",
        });
      }
      if (!category) {
        return res.status(400).json({
          success: false,
          error: "No category found for this id.",
        });
      }
      return res.status(200).json({
        success: true,
        msg: "Category deleted successfully!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Category not deleted",
    });
  }
};