const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },
  totalPaymentAmount: {
    type: Number,
    default: 0,
  },
  totalPurchaseAmount: {
    type: Number,
    default: 0,
  },
  totalPurchaseQuantity: {
    type: Number,
    default: 0,
  },
  difference: {
    type: Number,
    default: 0,
  },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerPayment' }],
  sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSales' }],
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;