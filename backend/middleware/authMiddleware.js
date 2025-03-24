const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("🔍 Received Token:", token); 

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log(" Decoded User:", decoded); 
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(" JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken };
