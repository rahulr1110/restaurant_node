const categoryModel = require("../models/categoryModel");

//create category
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error to create cat api",
      error,
    });
  }
};

//get all category
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "no category is found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category API",
      error,
    });
  }
};

//update category
const updateCatCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCatCategory) {
      return res.status(500).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updtae cat api",
    });
  }
};

//delet category
const deleteCatCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteCategory = await categoryModel.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(500).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete cat api",
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatCategory,
  deleteCatCategory,
};
