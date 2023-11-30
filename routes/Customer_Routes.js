const express = require("express");

const router = express.Router();
const {
  createCustomer,
  readAllCustomer,
  // readRegistrationId,
 
  // updateRegistration,
  // deleteRegistrationId,
  // readRegistrationByName,
  // readRegistrationByMobile
} = require("../controllers/Customer_Controller");



//Create User
router.post('/createCustomer',  createCustomer);

//read all user
router.get("/readAllCustomer",   readAllCustomer);


// router.get("/readRegistrationbyId/:id",  readRegistrationId);


// router.put("/updateRegistration/:id", updateRegistration);


// router.delete("/deleteRegistration/:id", deleteRegistrationId);


// router.get("/readRegistrationByName/:name", readRegistrationByName);

// router.get("/readRegistrationByMobile/:mobile", readRegistrationByMobile);

module.exports = router;

