import { Route } from "react-router-dom";
import RequiresClient from "../routeGuards/RequiresClient";
import Home from "../pages/Home";

const ClientRoutes = () => {
  return (
    <Route element={<RequiresClient />}>
      <Route path="/client/home" element={<Home logged={true} />} />
    </Route>
  );
};

export default ClientRoutes;
