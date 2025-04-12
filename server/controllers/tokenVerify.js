const jwt = require('jsonwebtoken');
const config = require('../config.json');


exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "No token provided" });
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Failed to authenticate token" });
      req.user = decoded; // decoded should contain the user's ID and email
      next();
    });
  };

