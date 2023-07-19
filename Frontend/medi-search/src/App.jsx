import { Route, Routes } from "react-router-dom";

//Persistence
import PersistLogin from "./components/persistence/PersistLogin";
import useAuth from "./hooks/persistence/useAuth";

//Layouts
import LoggedLayout from "./components/layouts/LoggedLayout";
import UnloggedLayout from "./components/layouts/UnloggedLayout";

// Routes
import UnauthRoutes from "./components/routes/UnauthRoutes";
import AuthRoutes from "./components/routes/AuthRoutes";

const App = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={auth.token ? <LoggedLayout /> : <UnloggedLayout />}
      >
        <Route element={<PersistLogin />}>
          {UnauthRoutes()}
          {AuthRoutes()}
          <Route path="*" element={<h1>404 page</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
