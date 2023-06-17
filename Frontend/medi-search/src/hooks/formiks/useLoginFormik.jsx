import * as Yup from "yup";
import { login } from "../../services/MediSearchServices/AccountServices";
import { toast } from "react-toastify";
import useAuth from "../persistence/useAuth";
import decodeJWT from "../../utils/decodeJWT";

const useLoginFormik = (setLoading) => {
  const { setAuth } = useAuth();
  const initialValues = { userName: "", password: "" };

  const validationSchema = Yup.object({
    userName: Yup.string().trim().required("Nombre de usuario requerido"),
    password: Yup.string().trim().required("Contraseña requerida"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await login(values);
      setAuth({
        token: res.data.jwToken,
        payload: decodeJWT(res.data.jwToken),
      });
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { initialValues, validationSchema, onSubmit };
};

export default useLoginFormik;
