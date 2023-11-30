const express = require('express');
const router = express.Router();
const salesController = require('../controllers/Customer_Sales_Controller');

// Create a new product
router.post('/createSales', salesController.createSales);

// Get a list of all products
router.get('/getAllSales', salesController.getAllSales);



module.exports = router;
