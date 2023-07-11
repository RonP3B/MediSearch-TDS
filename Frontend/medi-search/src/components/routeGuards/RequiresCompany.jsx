import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresCompany = () => {
  const { auth } = useAuth();
  const role = auth.payload.roles;

  return role === "Client" ? <Navigate to="/" replace /> : <Outlet />;
};

export default RequiresCompany;
