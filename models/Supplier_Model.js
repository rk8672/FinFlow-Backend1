const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
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
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupplierPayment' }],
  purchase: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupplierPurchase' }],
}, { timestamps: true });

const supplier = mongoose.model('Supplier', supplierSchema);

module.exports = supplier;