import * as Yup from "yup";

const useUserSignupFormik = () => {
  const initialUserValues = {
    name: "",
    lastName: "",
    username: "",
    userImg: null,
    country: "",
    city: "",
    address: "",
    phone: "",
    password: "",
    confirmPass: "",
    email: "",
  };

  const validationUserSchema = Yup.object({
    name: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    username: Yup.string()
      .trim()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .required("Nombre de usuario requerido"),
    userImg: Yup.mixed().required("Imagen requerida"),
    country: Yup.string().trim().required("País requerido"),
    city: Yup.string().trim().required("Ciudad requerida"),
    address: Yup.string().trim().required("Dirección requerida"),
    phone: Yup.string()
      .trim()
      .matches(/^\d{10}$/, "El número de teléfono debe tener 10 dígitos")
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
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  };

  return { validationUserSchema, initialUserValues, onSubmitUser };
};

export default useUserSignupFormik;
