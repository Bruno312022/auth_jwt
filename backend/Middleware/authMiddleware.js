const jwt = require("jsonwebtoken");
require('dotenv').config({ path: "./.env" });
const accessSecret = process.env.ACCESS_SECRET;


function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "missing token" });
    }


    try {
        const decoded = jwt.verify(token, accessSecret);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware

