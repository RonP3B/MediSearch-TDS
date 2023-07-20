import ResponsiveHeader from "../scenes/ResponsiveHeader";
import ResponsiveDrawer from "../scenes/ResponsiveDrawer";
import useAuth from "../../hooks/persistence/useAuth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { adminNav } from "../../utils/adminNav";

const LoggedLayout = () => {
  const { auth } = useAuth();

  const pages = ["opcion a", "opcion b", "opcion c"];

  const options = [
    { option: "Mi perfil", route: "/company/my-profile" },
    { option: "Opcion b", route: "/" },
    { option: "Opcion c", route: "/" },
  ];

  if (auth.payload.roles === "Client") {
    return (
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <ResponsiveHeader pages={pages} settings={options} logged={true} />
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
        settings={options}
      />
      <ToastContainer />
    </ConfirmProvider>
  );
};

export default LoggedLayout;
