const Payment = require('../models/Customer_Payment_Model');
const Customer_Model = require('../models/Customer_Model'); // Add this import

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { customerId, amount, date ,name,mode,remarks} = req.body;

    const payment = new Payment({
      customerId,
      amount,
      date,
      name,
      mode,
      remarks
    });

    const savedPayment = await payment.save();

  // Calculate the total payment for the associated registration
    const customer = await Customer_Model.findById(customerId); // Use customerId from the request
    if (customer) {
      customer.totalPaymentAmount += payment.amount;
     
      // Calculate and update the difference
        customer.difference = customer.totalPurchaseAmount - customer.totalPaymentAmount;
        await customer.save();

    }

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment1' });
  }
};






// Get a list of all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payments' });
  }
};

