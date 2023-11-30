const express = require("express");

const router = express.Router();
const {
  createSupplier,
  readAllSupplier,

} = require("../controllers/Supplier_Controller");



//Create Supplier
router.post('/createSupplier',  createSupplier);

//read all  Supplier
router.get("/readAllSupplier",   readAllSupplier);


module.exports = router;

