import { Route } from "react-router-dom";
import RequiresLab from "../routeGuards/RequiresLab";

const LabRoutes = () => {
  return (
    <Route element={<RequiresLab />}>
      <Route path="/company/creditors" element={<>Acreedores</>} />
    </Route>
  );
};

export default LabRoutes;
