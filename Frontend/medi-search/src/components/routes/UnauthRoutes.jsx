import { Route } from "react-router-dom";
import RequiresUnauth from "../routeGuards/RequiresUnauth";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PasswordRecovery from "../pages/PasswordRecovery";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

const UnauthRoutes = () => {
  return (
    <Route element={<RequiresUnauth />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/" element={<Home logged={false} />} />
      <Route
        path="/products/product-details/:id"
        element={<ProductDetails logged={false} showCompanyInfo={true} />}
      />
    </Route>
  );
};

export default UnauthRoutes;
