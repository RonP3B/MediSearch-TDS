import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useToast from "../feedback/useToast";
import { registerEmployee } from "../../services/MediSearchServices/AdminServices";

const useEmployeeRegisterFormik = (setLoading) => {
  const navigate = useNavigate();
  const showToast = useToast();

  const initialValues = {
    firstName: "",
    lastName: "",
    province: "",
    municipality: "",
    address: "",
    phoneNumber: "",
    email: "",
    role: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    role: Yup.string().trim().required("Rol requerido"),
    province: Yup.string().trim().required("Provincia requerida"),
    municipality: Yup.string().trim().required("Municipio requerido"),
    address: Yup.string().trim().required("Dirección requerida"),
    phoneNumber: Yup.string()
      .trim()
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        "El número de teléfono debe tener 10 dígitos"
      )
      .required("Teléfono requerido"),
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await registerEmployee(values);
      navigate("/company/users");
      showToast("Usuario registrado", {
        type: "success",
      });
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { validationSchema, initialValues, onSubmit };
};

export default useEmployeeRegisterFormik;
