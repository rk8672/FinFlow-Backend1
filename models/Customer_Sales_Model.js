const mongoose = require('mongoose');
const Customer_Model = require('./Customer_Model');
//const AllProduct_Model=require('./AllProduct_Model');

const salesSchema = new mongoose.Schema({
  cust_name: {type:String,required:true},
  salesDate: {type:String,required:true},
  quantity:  {type:Number,required:true},
  amount:  {type:Number,required:true},
  productName:  {type:String,required:true},
  product: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'AllProduct_Model',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer_Model',
  },

});

salesSchema.pre('save', function (next) {
  if (this.salesDate) {
    // No need to use getDate() on a string date
    const originalDate = new Date(this.salesDate);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear().toString();
    this.salesDate = `${day}-${month}-${year}`;
  }
  next();
});

//Update Customer Model
salesSchema.pre('save', async function (next) {
  try {
    const customer1 = await Customer_Model.findById(this.customer);
    customer1.sales.push(this._id);
    await customer1.save();
   
   
  
    
  } catch (error) {
    next(error);
  }
  next();
});

const sales = mongoose.model('CustomerSales', salesSchema);

module.exports = sales;
