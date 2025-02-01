const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "No authorization header" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(401).json({ message: "Invalid token" });
            }
            
            if (!decoded.userId) {
                return res.status(401).json({ message: "Invalid token payload" });
            }

            // Set the user object with the decoded userId
            req.user = {
                id: decoded.userId
            };
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: "Authentication failed" });
    }
}

module.exports = {
    authenticateToken,
};