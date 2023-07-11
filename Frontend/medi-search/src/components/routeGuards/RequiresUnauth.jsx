import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresUnauth = () => {
  const { auth } = useAuth();
  const role = auth?.payload?.roles;
  const redirectTo = role === "Client" ? "/" : "/company/dashboard";

  return !auth.token ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default RequiresUnauth;
