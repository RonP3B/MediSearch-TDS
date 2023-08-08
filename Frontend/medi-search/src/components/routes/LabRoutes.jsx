import { Route } from "react-router-dom";
import RequiresLab from "../routeGuards/RequiresLab";
import Companies from "../pages/Companies";

const LabRoutes = () => {
  return (
    <Route element={<RequiresLab />}>
      <Route
        path="/company/pharmacies"
        element={
          <Companies companyType="farmacia" logged={true} isCompany={true} />
        }
      />
    </Route>
  );
};

export default LabRoutes;
