import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresSuperAdmin = () => {
  const { auth } = useAuth();
  const role = auth.payload.roles;

  return role !== "SuperAdmin" ? (
    <Navigate to="/company/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default RequiresSuperAdmin;
