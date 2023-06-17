import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResponsiveHeader from "../scenes/ResponsiveHeader";

const UnloggedLayout = () => {
  const pages = ["opcion a", "opcion b", "opcion c"];
  const options = [
    { option: "Iniciar sesión", route: "/login" },
    { option: "Registrarse", route: "/signup" },
  ];

  return (
    <>
      <ResponsiveHeader pages={pages} settings={options} logged={false} />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default UnloggedLayout;
