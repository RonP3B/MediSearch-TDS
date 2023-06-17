import {} from "react";
import ResponsiveHeader from "../scenes/ResponsiveHeader";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LoggedLayout = () => {
  const pages = ["opcion a", "opcion b", "opcion c"];
  const options = [
    { option: "Opcion a", route: "/" },
    { option: "Opcion b", route: "/" },
    { option: "Opcion c", route: "/" },
  ];

  return (
    <>
      <ResponsiveHeader pages={pages} settings={options} logged={true} />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default LoggedLayout;
