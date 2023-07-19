import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresClient = () => {
  const { auth } = useAuth();
  const role = auth.payload.roles;

  return role !== "Client" ? (
    <Navigate to="/company/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default RequiresClient;
