const express = require('express');
const router = express.Router();

const { createProduct, readAllProduct, calculateGrandTotals } = require("../controllers/AllProduct_Controller");

// Create Product
router.post('/createProduct', createProduct);

// Read All Product
router.get('/readAllProduct', readAllProduct);

// Calculate and Get Grand Totals
router.get('/calculateGrandTotals', calculateGrandTotals);

module.exports = router;
