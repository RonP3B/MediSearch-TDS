import usePassRecoveryFormik from "../../hooks/formiks/usePassRecoveryFormik";
import ResponsiveHeader from "../scenes/ResponsiveHeader";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputField from "../custom/InputFields/InputField";
import PasswordInputField from "../custom/InputFields/PasswordInputField";
import MultiStepForm, { FormStep } from "../custom/MultiForm/MultiStepForm";

const pages = ["opcion a", "opcion b", "opcion c"];
const options = [
  { option: "Iniciar sesión", route: "/login" },
  { option: "Registrarse", route: "/signup" },
];

const PasswordRecovery = () => {
  const {
    initialValues,
    findUserValidation,
    codeValidation,
    newPassValidation,
    onSubmit,
  } = usePassRecoveryFormik();

  return (
    <>
      <ResponsiveHeader pages={pages} settings={options} />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Recuperar contraseña
          </Typography>

          <MultiStepForm initialValues={initialValues} onSubmit={onSubmit}>
            <FormStep
              stepName="Encontrar usuario"
              validationSchema={findUserValidation}
            >
              <InputField
                name="username"
                label="Nombre del usuario a recuperar"
                margin="dense"
                fullWidth
              />
            </FormStep>
            <FormStep
              stepName="Validar código"
              validationSchema={codeValidation}
            >
              <InputField
                name="code"
                label="Código de validación"
                margin="dense"
                fullWidth
              />
            </FormStep>
            <FormStep
              stepName="Nueva contraseña"
              validationSchema={newPassValidation}
            >
              <PasswordInputField
                name="newPassword"
                label="Contraseña"
                margin="dense"
                fullWidth
              />
              <PasswordInputField
                name="confirmNewPassword"
                label="Confirmar contraseña"
                margin="dense"
                fullWidth
              />
            </FormStep>
          </MultiStepForm>
        </Paper>
      </Container>
    </>
  );
};

export default PasswordRecovery;
