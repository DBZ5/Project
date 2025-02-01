const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;

const handlePayment = async (req, res) => {
  try {
    const { amount, source, items } = req.body;
    
    console.log('Payment request received:', req.body);

    // Input validation
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
        details: { received: amount }
      });
    }

    if (!source) {
      return res.status(400).json({
        success: false,
        message: 'Payment source is required'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in cart'
      });
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);

    try {
      // Create payment intent
      const charge = await stripe.charges.create({
        amount: amountInCents,
        currency: "usd",
        source: source,
        description: 'Example charge'
      });

      // Create order after successful payment
      const order = await Order.create({
        userId: req.user.id,
        total: amount,
        status: 'completed',
        paymentIntentId: charge.id
      });

      // Create order items
      await Promise.all(
        items.map(item => 
          OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          })
        )
      );

      return res.status(200).json({
        success: true,
        message: "Payment successful",
        orderId: order.id,
        orderItems: items
      });
    } catch (stripeError) {
      console.error('Stripe error:', stripeError);
      return res.status(400).json({
        success: false,
        message: stripeError.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
      include: [{ model: OrderItem, include: [db.Products] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { couponCode, totalAmount } = req.body;
    
    // Simple coupon validation logic
    if (couponCode === "DISCOUNT10") {
      const discountedAmount = totalAmount * 0.9;
      return res.json({
        success: true,
        discountedAmount: discountedAmount.toFixed(2),
        message: "10% discount applied"
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid coupon code"
    });
  } catch (error) {
    console.error('Coupon error:', error);
    return res.status(500).json({
      success: false,
      message: "Error processing coupon"
    });
  }
};

module.exports = { handlePayment, getOrderHistory, applyCoupon };
