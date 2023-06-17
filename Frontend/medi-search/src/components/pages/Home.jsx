import useAuth from "../../hooks/persistence/useAuth";

const Home = () => {
  const { auth } = useAuth();

  return (
    <>
      <h2>Home</h2>
      {auth.token && <h4>Rol del usuario: {auth.payload.roles}</h4>}
    </>
  );
};

export default Home;
