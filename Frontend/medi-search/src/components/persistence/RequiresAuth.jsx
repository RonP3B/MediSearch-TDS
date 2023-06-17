import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

const RequiresAuth = () => {
  const { auth } = useAuth();
  return auth.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequiresAuth;
