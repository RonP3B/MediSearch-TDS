import ResponsiveHeader from "../scenes/ResponsiveHeader";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Home = () => {
  return (
    <>
      <ResponsiveHeader pages={pages} settings={settings} />
      <h2>Home</h2>
    </>
  );
};

export default Home;
