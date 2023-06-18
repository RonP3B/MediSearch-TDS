import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changePassword,
  confirmCode,
  findUserReset,
} from "../../services/MediSearchServices/AccountServices";

const usePassRecoveryFormik = (
  setLoading,
  setEmailSent,
  setCodeValidated,
  setActiveStep
) => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const findUserValidation = Yup.object({
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
  });

  const codeValidation = Yup.object({
    code: Yup.string().trim().required("Código requerido"),
  });

  const newPassValidation = Yup.object({
    newPassword: Yup.string()
      .required("Nueva contraseña requerida")
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
      .required("Confirmar nueva contraseña requerido")
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir"),
  });

  const onSubmitFindUser = async (values) => {
    try {
      setLoading(true);
      await findUserReset(values);
      setEmailSent(true);
      toast.success(
        "Se ha enviado el código al correo electrónico del usuario"
      );
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
      setActiveStep(1);
    }
  };

  const onSubmitCode = async (values) => {
    try {
      setLoading(true);
      await confirmCode(values);
      setCodeValidated(true);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
      setActiveStep(2);
    }
  };

  const onSubmitNewPassword = async (values) => {
    try {
      setLoading(true);
      await changePassword(values);
      navigate("/login");
      toast.success("Su contraseña ha sido cambiada correctamente");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
      setActiveStep(3);
    }
  };

  return {
    initialValues,
    findUserValidation,
    codeValidation,
    newPassValidation,
    onSubmitFindUser,
    onSubmitCode,
    onSubmitNewPassword,
  };
};

export default usePassRecoveryFormik;
