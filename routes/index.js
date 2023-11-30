const express = require("express");

const route = express.Router();

//Login
const Login = require('./Login_Routes.js');
route.use('/login', Login);

//All Product
const product=require('./AllProduct_Router.js');
route.use('/product',product);


//Customer
const customerRoutes=require('./Customer_Routes.js');
route.use('/customer',customerRoutes);

//Customer Payments
const customerPaymentRoutes=require('./Customer_Payment_Routes.js');
route.use('/customer/payment',customerPaymentRoutes);

//Customer Sales
const customerSalesRoutes=require('./Customer_Sales_Router.js');
route.use('/customer/sales',customerSalesRoutes);

//Supplier
const supplierRoutes=require('./Supplier_Routes.js');
route.use('/supplier',supplierRoutes);

//Supplier Payment
const supplierPaymentRoutes=require('./Supplier_Payment_Routes.js');
route.use('/supplier/payment',supplierPaymentRoutes);

//Supplier Purchase
const supplierPurchaseRoutes=require('./Supplier_Purchase_Router.js');
route.use('/supplier/purchase',supplierPurchaseRoutes);

module.exports = route;