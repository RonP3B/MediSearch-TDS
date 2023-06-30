import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/MediSearchServices/AccountServices";
import useToast from "../useToast";

const useUserSignupFormik = (setLoading) => {
  const navigate = useNavigate();
  const showToast = useToast();

  const initialUserValues = {
    firstName: "",
    lastName: "",
    userName: "",
    image: null,
    province: "",
    municipality: "",
    address: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
    email: "",
  };

  const validationUserSchema = Yup.object({
    firstName: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    userName: Yup.string()
      .trim()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .required("Nombre de usuario requerido"),
    image: Yup.mixed().required("Imagen requerida"),
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
    password: Yup.string()
      .required("Contraseña requerida")
      .matches(
        /^(?=.*[a-z])/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .matches(/^(?=.*\d)/, "La contraseña debe contener al menos un número")
      .matches(
        /^(?=.*[!@#$%^&*()_\-+=[\]{};:<>|./?])/,
        "La contraseña debe contener al menos un carácter especial"
      )
      .matches(
        /^(?=.{8,})/,
        "La contraseña debe tener un mínimo de 8 caracteres"
      ),
    confirmPass: Yup.string()
      .required("Confirmar contraseña requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
  });

  const onSubmitUser = async (values) => {
    try {
      setLoading(true);
      await registerUser(values);
      navigate("/login");
      showToast("Usuario registrado, revisa su correo para activarlo", {
        type: "success",
      });
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { validationUserSchema, initialUserValues, onSubmitUser };
};

export default useUserSignupFormik;
