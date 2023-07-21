import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresLab = () => {
  const { auth } = useAuth();
  const role = auth.payload.RoleType;

  return role !== "Laboratorio" ? (
    <Navigate to="/company/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default RequiresLab;
