import * as Yup from "yup";
import { login } from "../../services/MediSearchServices/AccountServices";
import { useNavigate } from "react-router-dom";
import useAuth from "../persistence/useAuth";
import decodeJWT from "../../utils/decodeJWT";
import useToast from "../feedback/useToast";

const useLoginFormik = (setLoading) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const showToast = useToast();
  const initialValues = { userName: "", password: "" };

  const validationSchema = Yup.object({
    userName: Yup.string().trim().required("Nombre de usuario requerido"),
    password: Yup.string().trim().required("Contraseña requerida"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await login(values);
      const decoded = decodeJWT(res.data.jwToken);

      setAuth({
        token: res.data.jwToken,
        payload: decoded,
      });

      const redirectTo =
        decoded.roles === "Client" ? "/client/home" : "/company/dashboard";

      navigate(redirectTo);
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { initialValues, validationSchema, onSubmit };
};

export default useLoginFormik;
