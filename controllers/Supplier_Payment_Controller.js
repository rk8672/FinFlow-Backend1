const Payment = require('../models/Supplier_Payment_Model');
const Supplier_Model = require('../models/Supplier_Model'); // Add this import

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { supplierId, amount, date ,name,mode,remarks} = req.body;

    const payment = new Payment({
      supplierId,
      amount,
      date,
      name,
      mode,
      remarks
    });

    const savedPayment = await payment.save();

  // Calculate the total payment for the associated registration
    const supplier1 = await Supplier_Model.findById(supplierId); // Use customerId from the request
    if (supplier1) {
      supplier1.totalPaymentAmount += payment.amount;
     
      // Calculate and update the difference
      supplier1.difference = supplier1.totalPurchaseAmount - supplier1.totalPaymentAmount;
        await supplier1.save();

    }

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Supplier payment ' });
  }
};






// Get a list of all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all payments' });
  }
};

