import { Route } from "react-router-dom";
import RequiresPharmacy from "../routeGuards/RequiresPharmacy";
import Companies from "../pages/Companies";
import Products from "../pages/Products";

const PharmacyRoutes = () => {
  return (
    <>
      <Route element={<RequiresPharmacy />}>
        <Route
          path="/company/labs"
          element={
            <Companies
              companyType="laboratorio"
              logged={true}
              isCompany={true}
            />
          }
        />

        <Route
          path="/company/provisions"
          element={
            <Products
              isCompany={true}
              logged={true}
              companyType="Laboratorio"
            />
          }
        />
      </Route>
    </>
  );
};

export default PharmacyRoutes;
