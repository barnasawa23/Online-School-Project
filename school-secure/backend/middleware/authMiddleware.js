const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        try {
            const token = authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "Not authorized, no token" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no bearer token" });
    }
};

module.exports = { protect }; // Export as an object for clarity