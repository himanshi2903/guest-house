import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  return token && isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
