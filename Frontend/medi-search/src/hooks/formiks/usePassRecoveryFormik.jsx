import * as Yup from "yup";

const usePassRecoveryFormik = () => {
  const initialValues = {
    username: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const findUserValidation = Yup.object({
    username: Yup.string().trim().required("Nombre de usuario requerido"),
  });

  const codeValidation = Yup.object({
    code: Yup.string().trim().required("Código requerido"),
  });

  const newPassValidation = Yup.object({
    newPassword: Yup.string()
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
    confirmNewPassword: Yup.string()
      .required("Confirmar contraseña requerido")
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    alert("me mandaron");
  };

  return {
    initialValues,
    findUserValidation,
    codeValidation,
    newPassValidation,
    onSubmit,
  };
};

export default usePassRecoveryFormik;
