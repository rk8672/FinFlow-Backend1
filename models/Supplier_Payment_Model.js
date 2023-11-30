const mongoose = require('mongoose');
const Supplier_Model = require('./Supplier_Model'); // Import the Registration model

const supplierPaymentSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier_Model',
  },
  amount: Number,

  date: {
    type: String,
  },
  name: {
    type: String,
  },
  mode: {
    type: String,
  },
  remarks: {
    type: String,
  },

});

// Before saving to the database, format the date as "DDMMYYYY"
supplierPaymentSchema.pre('save', function (next) {
  if (this.date) {
    const originalDate = new Date(this.date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear().toString();
    this.date = `${day}-${month}-${year}`;
  }
  next();
});

// Update Customer Model
supplierPaymentSchema.pre('save', async function (next) {
  try {
    const supplier1 = await Supplier_Model.findById(this.supplierId);
    supplier1.payments.push(this._id);
    await supplier1.save();
  } catch (error) {
    next(error);
  }
  next();
});

const Payment = mongoose.model('SupplierPayment', supplierPaymentSchema);

module.exports = Payment;
