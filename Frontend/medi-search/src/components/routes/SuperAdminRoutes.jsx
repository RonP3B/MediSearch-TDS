import { Route } from "react-router-dom";
import SaveUser from "../pages/SaveUser";
import RequiresSuperAdmin from "../routeGuards/RequiresSuperAdmin";

const SuperAdminRoutes = () => {
  return (
    <Route element={<RequiresSuperAdmin />}>
      <Route path="/company/users/add" element={<SaveUser />} />
    </Route>
  );
};

export default SuperAdminRoutes;
