import { Route } from "react-router-dom";
import SaveUser from "../pages/SaveUser";
import RequiresSuperAdmin from "../routeGuards/RequiresSuperAdmin";
import Profile from "../pages/Profile";

const SuperAdminRoutes = () => {
  return (
    <Route element={<RequiresSuperAdmin />}>
      <Route path="/company/users/add" element={<SaveUser />} />
      <Route
        path="/company/my-company"
        element={
          <Profile profileType="empresa" isCompany={true} isClient={false} />
        }
      />
    </Route>
  );
};

export default SuperAdminRoutes;
