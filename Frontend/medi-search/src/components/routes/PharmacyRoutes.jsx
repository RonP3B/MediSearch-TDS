import { Route } from "react-router-dom";
import RequiresPharmacy from "../routeGuards/RequiresPharmacy";
import Providers from "../pages/Providers";

const PharmacyRoutes = () => {
  return (
    <Route element={<RequiresPharmacy />}>
      <Route path="/company/providers" element={<Providers />} />
    </Route>
  );
};

export default PharmacyRoutes;
