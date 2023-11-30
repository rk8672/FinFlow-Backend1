const mongoose = require('mongoose');
const Supplier_Model = require('./Supplier_Model');
//const AllProduct_Model = require('./AllProduct_Model');

const purchaseSchema = new mongoose.Schema({
  supp_name: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  productName: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AllProduct_Model',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier_Model',
  },
});

purchaseSchema.pre('save', function (next) {
  if (this.purchaseDate) {
    const originalDate = new Date(this.purchaseDate);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear().toString();
    this.purchaseDate = `${day}-${month}-${year}`;
  }
  next();
});

//Update Supplier Model
purchaseSchema.pre('save', async function (next) {
  try {
    const supplier1 = await Supplier_Model.findById(this.supplier);
    supplier1.purchase.push(this._id);
    await supplier1.save();
  } catch (error) {
    return next(error);
  }
  next();
});

const SupplierPurchase1 = mongoose.model('SupplierPurchase', purchaseSchema);

module.exports = SupplierPurchase1;
