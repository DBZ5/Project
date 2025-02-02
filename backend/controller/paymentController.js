const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User, Order } = require("../models");
const OrderItem = require("../models").OrderItem;

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
      include: [{ model: OrderItem, include: [require("../models").Products] }],
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

const createCheckoutSession = async (req, res) => {
  try {
    // Verify user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    // Get user from database
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Create Stripe checkout session with billing address collection
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      billing_address_collection: 'required', // Require billing address
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'], // Add countries you want to support
      },
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image]
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        userId: user.id,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    if (error.type === 'validation_error') {
      return res.status(400).json({ 
        message: error.message,
        code: error.code
      });
    }
    res.status(500).json({ message: "Error creating checkout session" });
  }
};

module.exports = { handlePayment, getOrderHistory, applyCoupon, createCheckoutSession };
