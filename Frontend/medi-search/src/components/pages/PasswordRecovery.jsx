import { useState } from "react";
import { Formik, Form } from "formik";
import usePassRecoveryFormik from "../../hooks/formiks/usePassRecoveryFormik";
import PasswordInputField from "../custom/InputFields/PasswordInputField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputField from "../custom/InputFields/InputField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const EmailInput = () => {
  return (
    <InputField
      name="email"
      label="Correo electrónico del usuario"
      margin="dense"
      fullWidth
    />
  );
};

const CodeInput = () => {
  return (
    <InputField
      name="code"
      label="Código de validación"
      margin="dense"
      fullWidth
    />
  );
};
const NewPasswordInputs = () => {
  return (
    <>
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
    </>
  );
};

const PasswordRecovery = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const {
    initialValues,
    findUserValidation,
    codeValidation,
    newPassValidation,
    onSubmitFindUser,
    onSubmitCode,
    onSubmitNewPassword,
  } = usePassRecoveryFormik(setLoading, setEmailSent, setCodeValidated);

  const getButtonMessage = () => {
    if (codeValidated) {
      return loading ? "Cambiando contraseña..." : "Cambiar contraseña";
    } else if (emailSent) {
      return loading ? "Verificando código..." : "Verificar código";
    } else {
      return loading ? "Buscando usuario..." : "Buscar usuario";
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Recuperar contraseña
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={
            codeValidated
              ? onSubmitNewPassword
              : emailSent
              ? onSubmitCode
              : onSubmitFindUser
          }
          validationSchema={
            codeValidated
              ? newPassValidation
              : emailSent
              ? codeValidation
              : findUserValidation
          }
        >
          {() => (
            <Form>
              {codeValidated ? (
                <NewPasswordInputs />
              ) : emailSent ? (
                <CodeInput />
              ) : (
                <EmailInput />
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 1,
                  opacity: loading ? 0.5 : 1,
                  ...(loading && { pointerEvents: "none" }),
                }}
              >
                {loading && (
                  <CircularProgress
                    size={17}
                    color="inherit"
                    sx={{ marginRight: 0.55 }}
                  />
                )}
                {getButtonMessage()}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default PasswordRecovery;
