const jwt = require("jsonwebtoken");

const bookingAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ Token Missing or Incorrect Format:", authHeader); 
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); 
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = bookingAuth;