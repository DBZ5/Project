const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  const { amount, id } = req.body;
  
  if (!amount || !id) {
    return res.status(400).json({ 
      success: false, 
      message: "Amount and payment method ID are required" 
    });
  }

  try {
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    
    res.status(200).json({ 
      success: true, 
      message: "Payment successful",
      paymentId: payment.id
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Payment failed",
      error: error.message 
    });
  }
};

module.exports = { handlePayment };
