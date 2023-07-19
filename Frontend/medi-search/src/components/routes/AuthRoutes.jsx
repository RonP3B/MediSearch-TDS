import { Route } from "react-router-dom";
import RequiresAuth from "../routeGuards/RequiresAuth";
import CompanyRoutes from "./CompanyRoutes";
import ClientRoutes from "./ClientRoutes";

const AuthRoutes = () => {
  return (
    <Route element={<RequiresAuth />}>
      {CompanyRoutes()}
      {ClientRoutes()}
    </Route>
  );
};

export default AuthRoutes;
