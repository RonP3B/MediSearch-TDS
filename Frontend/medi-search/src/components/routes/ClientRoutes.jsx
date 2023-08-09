import { Route } from "react-router-dom";
import ClientHome from "../pages/ClientHome";
import ProductDetails from "../pages/ProductDetails";
import CompanyDetails from "../pages/CompanyDetails";
import Products from "../pages/Products";
import RequiresClient from "../routeGuards/RequiresClient";
import Companies from "../pages/Companies";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";
import Favorites from "../pages/Favorites";

const ClientRoutes = () => {
  return (
    <Route element={<RequiresClient />}>
      <Route path="/client/home" element={<ClientHome />} />
      <Route path="/client/chat" element={<Chat isCompany={false} />} />
      <Route path="/client/favs" element={<Favorites />} />
      <Route
        path="/client/products"
        element={
          <Products isCompany={false} logged={true} companyType="Farmacia" />
        }
      />
      <Route
        path="client/products/product-details/:id"
        element={
          <ProductDetails
            logged={true}
            showCompanyInfo={true}
            isCompany={false}
          />
        }
      />
      <Route
        path="client/companies/company-details/:id"
        element={<CompanyDetails isCompany={false} />}
      />
      <Route
        path="client/companies/pharmacies"
        element={
          <Companies companyType="farmacia" logged={true} isCompany={false} />
        }
      />
      <Route
        path="/client/my-profile"
        element={<Profile profileType="perfil" isCompany={false} />}
      />
    </Route>
  );
};

export default ClientRoutes;
