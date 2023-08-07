import ResponsiveHeader from "../scenes/ResponsiveHeader";
import ResponsiveDrawer from "../scenes/ResponsiveDrawer";
import useAuth from "../../hooks/persistence/useAuth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { adminNav } from "../../utils/adminNav";

const LoggedLayout = () => {
  const { auth } = useAuth();
  const role = auth.payload.roles;

  const pages = ["opcion a", "opcion b", "opcion c"];

  const clientOptions = [
    { option: "opcion a", route: "/" },
    { option: "Opcion b", route: "/" },
    { option: "Opcion c", route: "/" },
  ];

  const companyAdminOptions = [
    { option: "Dashboard", route: "/company/dashboard" },
    { option: "Mi perfil", route: "/company/my-profile" },
  ];

  if (role === "SuperAdmin") {
    companyAdminOptions.push({
      option: "Mi empresa",
      route: "/company/my-company",
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
