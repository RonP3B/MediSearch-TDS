import { Route } from "react-router-dom";
import RequiresCompany from "../routeGuards/RequiresCompany";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import SaveProduct from "../pages/SaveProduct";
import Profile from "../pages/Profile";
import CompanyDetails from "../pages/CompanyDetails";
import ProductDetails from "../pages/ProductDetails";
import SuperAdminRoutes from "./SuperAdminRoutes";
import PharmacyRoutes from "./PharmacyRoutes";
import LabRoutes from "./LabRoutes";
import Chat from "../pages/Chat";
import MyProducts from "../pages/MyProducts";

const CompanyRoutes = () => {
  return (
    <Route element={<RequiresCompany />}>
      <Route path="/company/dashboard" element={<Dashboard />} />
      <Route path="/company/users" element={<Users />} />
      <Route path="/company/my-products" element={<MyProducts />} />
      <Route
        path="/company/company-details/:id"
        element={<CompanyDetails isCompany={true} />}
      />
      <Route path="/company/chat" element={<Chat isCompany={true} />} />
      <Route
        path="/company/my-profile"
        element={
          <Profile profileType="perfil" isCompany={true} isClient={false} />
        }
      />
      <Route
        path="/company/my-products/add"
        element={<SaveProduct edit={false} />}
      />
      <Route
        path="/company/my-products/edit/:id"
        element={<SaveProduct edit={true} />}
      />
      <Route
        path="/company/my-products/product-details/:id"
        element={
          <ProductDetails
            logged={true}
            showCompanyInfo={false}
            isCompany={true}
          />
        }
      />
      <Route
        path="/company/products/product-details/:id"
        element={
          <ProductDetails
            logged={true}
            showCompanyInfo={true}
            isCompany={true}
          />
        }
      />
      {SuperAdminRoutes()}
      {LabRoutes()}
      {PharmacyRoutes()}
    </Route>
  );
};

export default CompanyRoutes;
