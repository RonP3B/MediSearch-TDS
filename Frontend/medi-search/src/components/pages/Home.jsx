import PropTypes from "prop-types";
import useAuth from "../../hooks/persistence/useAuth";

const Home = ({ logged }) => {
  const { auth } = useAuth();

  return (
    <>
      <h2>Home</h2>
      {logged && <h4>Rol del usuario: {auth.payload.roles}</h4>}
    </>
  );
};

Home.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Home;
