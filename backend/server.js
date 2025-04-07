const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const transactionRoutes = require("./routes/transactions"); 
const availabilityRoutes = require("./routes/availabilityRoutes");


const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/bookings", authMiddleware.verifyToken, bookingRoutes);
app.use("/transactions", authMiddleware.verifyToken, transactionRoutes); 
app.use("/admin", authMiddleware.verifyToken, adminRoutes);
app.use("/admin/availability", availabilityRoutes);


app.get("/", (req, res) => {
  res.send("Guest House Booking API is running...");
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
