import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/admin/dashboard", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error.response?.data || error.message);
    return null;
  }
};

export const fetchAllBookings = async () => {
  try {
    const response = await api.get("/admin/bookings", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.response?.data || error.message);
    return [];
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    await api.put(
      `/admin/bookings/${id}`,
      { status },
      { headers: getAuthHeaders() }
    );
  } catch (error) {
    console.error("Error updating booking status:", error.response?.data || error.message);
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/admin/users", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return [];
  }
};

export const updateUser = async (id, userData) => {
  try {
    await api.put(
      `/admin/users/${id}`,
      userData,
      { headers: getAuthHeaders() }
    );
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/admin/users/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
  }
};

// ✅ Add these functions to your existing `api.js`

// Fetch availability data
export const fetchAvailability = async () => {
  try {
    const response = await api.get("/admin/availability", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching availability:", error.response?.data || error.message);
    return null;
  }
};

// Update availability (admin only)
export const updateAvailability = async (data) => {
  try {
    const response = await api.put("/admin/availability", data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating availability:", error.response?.data || error.message);
    return false;
  }
};
