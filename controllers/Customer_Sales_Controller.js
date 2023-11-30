const CustomerSales = require('../models/Customer_Sales_Model');
const Customer = require('../models/Customer_Model'); // Add this import
const Product_Model=require('../models/AllProduct_Model')
// Create a new Customer Sales
exports.createSales = async (req, res) => {
  try {
    const {
      cust_name,
      salesDate,
      quantity,
      amount,
      productName,
      product,
      customer,
    } = req.body;

    const sales1 = new CustomerSales({
      cust_name,
      salesDate,
      quantity,
      productName,
      amount,
      product:product,
      customer: customer, // Link the product to the customer
    });

    const savedSales = await sales1.save();
 
  // Update Customer Table
   const customer1 = await Customer.findById(customer);
   if (customer1) {
    customer1.totalPurchaseAmount += sales1.amount;
   customer1.difference = customer1.totalPurchaseAmount - customer1.totalPaymentAmount;
    customer1.totalPurchaseQuantity += sales1.quantity;
    await customer1.save();
   }


   //Update Product Table
   const product1=await Product_Model.findById(product);
   if(product1){
    product1.total_sales +=sales1.quantity;
    product1.available_quantity -=sales1.quantity;
    await product1.save();

   }



    res.status(201).json(savedSales);
  } catch (error) {
    res.status(500).json({ error: 'Error creating new customer sales' });
  }
};

// Get a list of all Sales
exports.getAllSales = async (req, res) => {
  try {
    const allsales = await CustomerSales.find({});
    res.json(allsales);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all customer sales' });
  }
};


