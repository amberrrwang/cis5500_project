const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "No token provided" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Failed to authenticate token" });
      req.user = decoded; // decoded should contain the user's ID and email
      next();
    });
  };

