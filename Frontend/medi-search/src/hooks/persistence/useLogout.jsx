import { logout } from "../../services/MediSearchServices/AccountServices";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logout();
      setAuth({});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return logoutUser;
};

export default useLogout;
