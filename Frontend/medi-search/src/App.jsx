import { Route, Routes } from "react-router-dom";

//Persistence
//import RequiresAuth from "./components/persistence/RequiresAuth";
import RequiresUnauth from "./components/persistence/RequiresUnauth";
import PersistLogin from "./components/persistence/PersistLogin";

//Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PasswordRecovery from "./components/pages/PasswordRecovery";
import useAuth from "./hooks/persistence/useAuth";

//Layouts
import LoggedLayout from "./components/layouts/LoggedLayout";
import UnloggedLayout from "./components/layouts/UnloggedLayout";

//prueba
import SideBar from "./components/scenes/SideBar";

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

          {/* Non-existence handler */}
          <Route path="*" element={<h1>404 page</h1>} />
        </Route>
      </Route>

      {/* Prueba sidebar */}
      <Route path="prueba" element={<SideBar />} />
      {/* Prueba sidebar */}
    </Routes>
  );
};

export default App;
