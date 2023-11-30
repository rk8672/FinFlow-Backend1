const mongoose = require('mongoose');
const Customer_Model = require('./Customer_Model'); // Import the Registration model

const customerPaymentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer_Model',
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
customerPaymentSchema.pre('save', function (next) {
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
customerPaymentSchema.pre('save', async function (next) {
  try {
    const customer1 = await Customer_Model.findById(this.customerId);
    customer1.payments.push(this._id);
    await customer1.save();
  } catch (error) {
    next(error);
  }
  next();
});

const Payment = mongoose.model('CustomerPayment', customerPaymentSchema);

module.exports = Payment;
