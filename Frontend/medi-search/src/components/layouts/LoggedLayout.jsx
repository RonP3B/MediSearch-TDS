import ResponsiveHeader from "../scenes/ResponsiveHeader";
import ResponsiveDrawer from "../scenes/ResponsiveDrawer";
import useAuth from "../../hooks/persistence/useAuth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { adminNav } from "../../utils/adminNav";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import Favorite from "@mui/icons-material/Favorite";

const LoggedLayout = () => {
  const { auth } = useAuth();
  const role = auth.payload.roles;

  const pages = [
    { page: "Inicio", route: "/client/home" },
    { page: "Productos", route: "/client/products" },
    { page: "Farmacias", route: "/client/companies/pharmacies" },
    { page: "Mis favoritos", route: "/client/favs" },
    { page: "Chat", route: "/client/chat" },
    { page: "Mi perfil", route: "/client/my-profile" },
  ];

  const clientOptions = [
    { option: "Inicio", route: "/client/home", Icon: HomeIcon },
    { option: "Mi perfil", route: "/client/my-profile", Icon: PersonIcon },
    { option: "Mis favoritos", route: "/client/favs", Icon: Favorite },
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
