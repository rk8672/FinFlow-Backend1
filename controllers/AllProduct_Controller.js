const AllProduct = require('../models/AllProduct_Model');

const createProduct = async (req, res) => {
  try {
    const bodyData = req.body;
    const product1 = new AllProduct(bodyData);
    const productData = await product1.save();
    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const readAllProduct = async (req, res) => {
  try {
    const allProductData = await AllProduct.find({});
    res.json(allProductData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const calculateGrandTotals = async (req, res) => {
  try {
    const grandTotals = await AllProduct.calculateGrandTotals();
    res.json(grandTotals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createProduct, readAllProduct, calculateGrandTotals };
