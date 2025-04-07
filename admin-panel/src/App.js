import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.css";
import Availability from "./pages/Availability";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />

        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/availability" element={<Availability />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
