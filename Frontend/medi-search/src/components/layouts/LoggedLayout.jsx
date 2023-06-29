import ResponsiveHeader from "../scenes/ResponsiveHeader";
import ResponsiveDrawer from "../scenes/ResponsiveDrawer";
import useAuth from "../../hooks/persistence/useAuth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { adminNav } from "../../utils/adminNav";

const LoggedLayout = () => {
  const { auth } = useAuth();

  const pages = ["opcion a", "opcion b", "opcion c"];

  const options = [
    { option: "Opcion a", route: "/" },
    { option: "Opcion b", route: "/" },
    { option: "Opcion c", route: "/" },
  ];

  if (auth.payload.roles === "Client") {
    return (
      <>
        <ResponsiveHeader pages={pages} settings={options} logged={true} />
        <main>
          <Outlet />
        </main>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
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
    </>
  );
};

export default LoggedLayout;
