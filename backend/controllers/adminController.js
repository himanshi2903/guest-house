const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [bookings] = await db.promise().query("SELECT COUNT(*) AS totalBookings FROM bookings");
    const [pending] = await db.promise().query("SELECT COUNT(*) AS pendingBookings FROM bookings WHERE status = 'pending'");
    const [users] = await db.promise().query("SELECT COUNT(*) AS totalUsers FROM users");

    res.json({
      totalBookings: bookings[0].totalBookings,
      pendingBookings: pending[0].pendingBookings,
      totalUsers: users[0].totalUsers
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const [bookings] = await db.promise().query("SELECT * FROM bookings ORDER BY id DESC");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value. Allowed values: 'pending', 'confirmed'" });
    }

    try {
        await db.promise().query("UPDATE bookings SET status = ? WHERE id = ?", [status, id]);
        res.status(200).json({ message: "Booking status updated successfully" });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ message: "Error updating booking status" });
    }
};


const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  
  try {
    await db.promise().query("UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?", [name, email, role, id]);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { getDashboardStats, getAllBookings, updateBookingStatus, getAllUsers, updateUser, deleteUser };
