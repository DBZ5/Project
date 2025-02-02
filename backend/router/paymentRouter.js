const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { createCheckoutSession } = require('../controller/paymentController');

router.post('/create-checkout-session', authenticateToken, createCheckoutSession);

module.exports = router; 