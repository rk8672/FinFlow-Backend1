const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/Supplier_Payment_Controller');

// Create a new payment
router.post('/createPayment', paymentController.createPayment);

// Get a list of all payments
router.get('/allSupplierPayments', paymentController.getAllPayments);



module.exports = router;
