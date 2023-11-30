const Supplier_Model = require("../models/Supplier_Model");

const createSupplier = async (req, res) => {
  try {
    const bodyData = req.body;
    const newSupplier = new Supplier_Model(bodyData);
    const supplierData = await newSupplier.save();
    res.send(supplierData);
  } catch (error) {
    res.send(error);
  }
};
const readAllSupplier = async (req, res) => {
  try {
    const supplierData = await Supplier_Model.find()
    .populate('payments') 
    .populate('purchase') ;
 
    res.send(supplierData);
  } catch (error) {
    res.send(error);
  }
};




module.exports = {
  createSupplier,
  readAllSupplier,


};
