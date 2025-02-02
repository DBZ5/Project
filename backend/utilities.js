const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { authenticateToken };