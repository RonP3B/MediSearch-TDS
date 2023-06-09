import ResponsiveHeader from "../scenes/ResponsiveHeader";

const pages = ["opcion a", "opcion b", "opcion c"];
const options = [
  { option: "Iniciar sesión", route: "/login" },
  { option: "Registrarse", route: "/signup" },
];

const Home = () => {
  return (
    <>
      <ResponsiveHeader pages={pages} settings={options} />
      <h2>Home</h2>
    </>
  );
};

export default Home;
