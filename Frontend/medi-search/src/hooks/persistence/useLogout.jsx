import { logout } from "../../services/MediSearchServices/AccountServices";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logoutUser = async () => {
    try {
      await logout();
      setAuth({});
    } catch (error) {
      console.log(error);
    }
  };

  return logoutUser;
};

export default useLogout;
