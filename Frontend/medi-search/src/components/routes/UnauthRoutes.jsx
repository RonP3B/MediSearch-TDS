import { Route } from "react-router-dom";
import RequiresUnauth from "../routeGuards/RequiresUnauth";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PasswordRecovery from "../pages/PasswordRecovery";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import CompanyDetails from "../pages/CompanyDetails";
import Companies from "../pages/Companies";
import HomeProducts from "../pages/HomeProducts";

const UnauthRoutes = () => {
  return (
    <Route element={<RequiresUnauth />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<HomeProducts />} />
      <Route
        path="/products/product-details/:id"
        element={
          <ProductDetails
            logged={false}
            showCompanyInfo={true}
            isCompany={false}
          />
        }
      />
      <Route
        path="/companies/company-details/:id"
        element={<CompanyDetails isCompany={false} />}
      />
      <Route
        path="/companies/pharmacies"
        element={
          <Companies companyType="farmacia" logged={false} isCompany={false} />
        }
      />
      <Route
        path="/companies/labs"
        element={
          <Companies
            companyType="laboratorio"
            logged={false}
            isCompany={false}
          />
        }
      />
    </Route>
  );
};

export default UnauthRoutes;
