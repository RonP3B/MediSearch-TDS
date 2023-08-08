import ResponsiveHeader from "../scenes/ResponsiveHeader";
import ResponsiveDrawer from "../scenes/ResponsiveDrawer";
import useAuth from "../../hooks/persistence/useAuth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { adminNav } from "../../utils/adminNav";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";

const LoggedLayout = () => {
  const { auth } = useAuth();
  const role = auth.payload.roles;

  const pages = ["opcion a", "opcion b", "opcion c"];

  const clientOptions = [
    { option: "opcion a", route: "/", Icon: Brightness4Icon },
    { option: "Opcion b", route: "/", Icon: Brightness4Icon },
    { option: "Opcion c", route: "/", Icon: Brightness4Icon },
  ];

  const companyAdminOptions = [
    { option: "Dashboard", route: "/company/dashboard", Icon: DashboardIcon },
    { option: "Mi perfil", route: "/company/my-profile", Icon: PersonIcon },
  ];

  if (role === "SuperAdmin") {
    companyAdminOptions.push({
      option: "Mi empresa",
      route: "/company/my-company",
      Icon: HomeWorkIcon,
    });
  }

  if (role === "Client") {
    return (
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <ResponsiveHeader
          pages={pages}
          settings={clientOptions}
          logged={true}
        />
        <main>
          <Outlet />
        </main>
        <ToastContainer />
      </ConfirmProvider>
    );
  }

  return (
    <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: { autoFocus: true },
      }}
    >
      <ResponsiveDrawer
        main={
          <main>
            <Outlet />
          </main>
        }
        nav={adminNav}
        settings={companyAdminOptions}
      />
      <ToastContainer />
    </ConfirmProvider>
  );
};

export default LoggedLayout;
