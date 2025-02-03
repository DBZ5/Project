const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    res.json({ success: false, message: "Payment failed", error });
  }
};

module.exports = { handlePayment };
