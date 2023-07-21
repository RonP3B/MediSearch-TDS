import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresPharmacy = () => {
  const { auth } = useAuth();
  const role = auth.payload.RoleType;

  return role !== "Farmacia" ? (
    <Navigate to="/company/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default RequiresPharmacy;
