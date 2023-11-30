const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
 product_code:{type:String,required:true},
 product_name:{type:String,required:true},
 total_sales:{type:Number,default: 0},//Done
 total_purchase:{type:Number,default: 0},//done
 available_quantity:{type:Number,default: 0},//done


},{ timestamps: true });

productSchema.statics.calculateGrandTotals = async function () {
    try {
      const result = await this.aggregate([
        {
          $group: {
            _id: null,
            grand_total_sales: { $sum: '$total_sales' },
            grand_total_purchase: { $sum: '$total_purchase' },
          },
        },
      ]);
  
      return result.length > 0
        ? result[0]
        : { grand_total_sales: 0, grand_total_purchase: 0 };
    } catch (error) {
      console.error('Error calculating grand totals:', error);
      throw error;
    }
  };
  
  




const product=mongoose.model('AllProduct',productSchema);
module.exports =product;