const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/Supplier_Purchase_Controller');

// Create a new product
router.post('/createPurchase', purchaseController.createPurchase);

// Get a list of all products
router.get('/getAllPurchase', purchaseController.getAllPurchase);



module.exports = router;
