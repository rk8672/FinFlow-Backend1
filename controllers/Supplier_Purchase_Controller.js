const SupplierPurchase = require('../models/Supplier_Purchase_Model');
const Supplier_Model = require('../models/Supplier_Model');
const Product_Model = require('../models/AllProduct_Model');

exports.createPurchase = async (req, res) => {
  try {
    const {
      supp_name,
      purchaseDate,
      quantity,
      amount,
      productName,
      product,
      supplier,
    } = req.body;

    const purchase1 = new SupplierPurchase({
      supp_name,
      purchaseDate,
      quantity,
      productName,
      amount,
      product: product,
      supplier: supplier,
    });

    const savedPurchase = await purchase1.save();

    // Uncomment the following lines for debugging the update of Customer and Product tables
 
    const supplier1 = await Supplier_Model.findById(supplier);
    if (supplier1) {
      supplier1.totalPurchaseAmount += purchase1.amount;
      supplier1.difference = supplier1.totalPurchaseAmount - supplier1.totalPaymentAmount;
      supplier1.totalPurchaseQuantity += purchase1.quantity;
      await supplier1.save();
    }

    const product1 = await Product_Model.findById(product);
    if (product1) {
      product1.total_purchase += purchase1.quantity;
      product1.available_quantity += purchase1.quantity;
      await product1.save();
    }
  

    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors });
    } else {
      res.status(500).json({ error: 'Error creating new supplier purchase' });
    }
  }
};

exports.getAllPurchase = async (req, res) => {
  try {
    const allPurchase = await SupplierPurchase.find({});
    res.json(allPurchase);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Error fetching all supplier purchase' });
  }
};
