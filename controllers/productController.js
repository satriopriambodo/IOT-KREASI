const { Product } = require("../models");

const getProducts = async (req, res, next) => {
  try {
    const result = await Product.findAll({
      order: [["id", "asc"]],
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { productName, description } = req.body;
    const result = await Product.create({
      productName,
      description,
      userId: req.user.id,
    });
    res.status(201).json({ result });
  } catch (error) {
    // next(error);
    console.log(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productName, description } = req.body;
    const { id } = req.params;

    const findProduct = await Product.findByPk(id);
    if (findProduct) {
      const result = await Product.update(
        { productName, description },
        { where: { id }, returning: true }
      );

      res.status(200).json({ result: result[1][0] });
    } else {
      res.status(404).json({ message: `Product id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      throw { name: "Bad Request" };
    }

    const deleteProduct = await Product.destroy({ where: { id: id } });
    res.status(200).json(deleteProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
