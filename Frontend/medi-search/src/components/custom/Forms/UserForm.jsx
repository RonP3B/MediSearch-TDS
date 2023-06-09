import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputField from "../InputFields/InputField";
import ImageInput from "../InputFields/ImageInput";
import PasswordInputField from "../InputFields/PasswordInputField";

const UserForm = () => {
  const { initialUserValues, validationUserSchema, onSubmitUser } =
    useUserSignupFormik();

  return (
    <Formik
      initialValues={initialUserValues}
      onSubmit={onSubmitUser}
      validationSchema={validationUserSchema}
    >
      {() => (
        <Form>
          <UserFormContent />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginY: 2 }}
          >
            registrar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const UserFormContent = () => {
  return (
    <>
      <ImageInput name="userImg" label="Imagen del usuario" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField name="name" label="Nombre" margin="dense" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="lastName"
            label="Apellido"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="username"
            label="Nombre de usuario"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name="country" label="País" margin="dense" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name="city" label="Cuidad" margin="dense" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="address"
            label="Dirección"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="phone"
            type="tel"
            label="Teléfono"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordInputField
            name="password"
            label="Contraseña"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordInputField
            name="confirmPass"
            label="Confirmar contraseña"
            margin="dense"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="email"
            type="email"
            label="Correo electrónico"
            margin="dense"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
