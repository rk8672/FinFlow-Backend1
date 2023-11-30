const Customer_Model = require("../models/Customer_Model");

const createCustomer = async (req, res) => {
  try {
    const bodyData = req.body;
    const newCustomer = new Customer_Model(bodyData);
    const customerData = await newCustomer.save();
    res.send(customerData);
  } catch (error) {
    res.send(error);
  }
};
const readAllCustomer = async (req, res) => {
  try {
    const customerData = await Customer_Model.find()
    .populate('payments') 
    .populate('sales') ;
 
    res.send(customerData);
  } catch (error) {
    res.send(error);
  }
};




module.exports = {
  createCustomer,
  readAllCustomer,


};
