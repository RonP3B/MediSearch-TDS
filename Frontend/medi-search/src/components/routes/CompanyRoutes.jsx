import { Route } from "react-router-dom";
import RequiresCompany from "../routeGuards/RequiresCompany";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import SaveProduct from "../pages/SaveProduct";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import SuperAdminRoutes from "./SuperAdminRoutes";

const CompanyRoutes = () => {
  return (
    <Route element={<RequiresCompany />}>
      <Route path="/company/dashboard" element={<Dashboard />} />
      <Route path="/company/users" element={<Users />} />
      <Route path="/company/products" element={<Products />} />
      <Route path="/company/my-profile" element={<Profile />} />
      <Route
        path="/company/products/add"
        element={<SaveProduct edit={false} />}
      />
      <Route
        path="/company/products/edit/:id"
        element={<SaveProduct edit={true} />}
      />
      <Route
        path="/company/products/product-details/:id"
        element={<ProductDetails logged={true} client={false} />}
      />
      {SuperAdminRoutes()}
    </Route>
  );
};

export default CompanyRoutes;
