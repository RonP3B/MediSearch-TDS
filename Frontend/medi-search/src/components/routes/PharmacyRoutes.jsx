import { Route } from "react-router-dom";
import RequiresPharmacy from "../routeGuards/RequiresPharmacy";
import Companies from "../pages/Companies";
import Provisions from "../pages/Provisions";

const PharmacyRoutes = () => {
  return (
    <>
      <Route element={<RequiresPharmacy />}>
        <Route
          path="/company/labs"
          element={<Companies companyType="laboratorio" />}
        />
      </Route>
      <Route path="/company/provisions" element={<Provisions />} />
    </>
  );
};

export default PharmacyRoutes;
