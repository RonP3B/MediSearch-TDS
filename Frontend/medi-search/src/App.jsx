import { Route, Routes } from "react-router-dom";

//Persistence
//import RequiresAuth from "./components/persistence/RequiresAuth";
import RequiresUnauth from "./components/persistence/RequiresUnauth";
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
          {/* Routes that require to be unauthorized  */}
          <Route element={<RequiresUnauth />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
          </Route>

          <Route path="/" element={<Home />} />

          {/* Limit this to company accounts */}
          <Route path="/company/dashboard" element={<Dashboard />} />
          <Route path="/company/users" element={<Users />} />
          <Route path="/company/users/add" element={<SaveUser />} />
          {/* Limit this to company accounts */}

          {/* Non-existence handler */}
          <Route path="*" element={<h1>404 page</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
