import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResponsiveHeader from "../scenes/ResponsiveHeader";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const UnloggedLayout = () => {
  const pages = [
    { page: "Inicio", route: "/" },
    { page: "Farmacias", route: "/companies/pharmacies" },
    { page: "Laboratorios", route: "/companies/labs" },
    { page: "Productos", route: "/products" },
  ];
  const options = [
    { option: "Iniciar sesión", route: "/login", Icon: LoginIcon },
    { option: "Registrarse", route: "/signup", Icon: AppRegistrationIcon },
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
