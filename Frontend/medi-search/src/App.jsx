import { Route, Routes } from "react-router-dom";

//Persistence
import PersistLogin from "./components/persistence/PersistLogin";
import useAuth from "./hooks/persistence/useAuth";

//Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PasswordRecovery from "./components/pages/PasswordRecovery";
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import SaveUser from "./components/pages/SaveUser";
import Products from "./components/pages/Products";
import SaveProduct from "./components/pages/SaveProduct";
import ProductDetails from "./components/pages/ProductDetails";

//RouteGuards
import RequiresAuth from "./components/routeGuards/RequiresAuth";
import RequiresUnauth from "./components/routeGuards/RequiresUnauth";
import RequiresCompany from "./components/routeGuards/RequiresCompany";
import RequiresSuperAdmin from "./components/routeGuards/RequiresSuperAdmin";

//Layouts
import LoggedLayout from "./components/layouts/LoggedLayout";
import UnloggedLayout from "./components/layouts/UnloggedLayout";

const App = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={auth.token ? <LoggedLayout /> : <UnloggedLayout />}
      >
        <Route element={<PersistLogin />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          <Route element={<RequiresUnauth />}>
            {/* Routes that require to be unauthorized  */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
          </Route>

          <Route element={<RequiresAuth />}>
            {/* Routes that require to be authorized */}
            <Route element={<RequiresCompany />}>
              {/* Routes that require to be a company account */}
              <Route path="/company/dashboard" element={<Dashboard />} />
              <Route path="/company/users" element={<Users />} />
              <Route path="/company/products" element={<Products />} />
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
              <Route element={<RequiresSuperAdmin />}>
                {/* Routes that require to be a SuperAdmin */}
                <Route path="/company/users/add" element={<SaveUser />} />
              </Route>
            </Route>
          </Route>

          {/* Non-existence handler */}
          <Route path="*" element={<h1>404 page</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
