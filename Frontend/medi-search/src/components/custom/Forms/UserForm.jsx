import { useState, useEffect } from "react";
import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputField from "../InputFields/InputField";
import ImageInput from "../InputFields/ImageInput";
import PasswordInputField from "../InputFields/PasswordInputField";
import CircularProgress from "@mui/material/CircularProgress";
import SelectInputField from "../InputFields/SelectInputField";
import {
  getMunicipalities,
  getProvinces,
} from "../../../services/TerritorialDivisionServices/TerritorialServcives";

const UserForm = () => {
  const [loading, setLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [userImgName, setUserImgName] = useState("");
  const { initialUserValues, validationUserSchema, onSubmitUser } =
    useUserSignupFormik(setLoading);

  return (
    <Formik
      initialValues={initialUserValues}
      onSubmit={onSubmitUser}
      validationSchema={validationUserSchema}
    >
      {() => (
        <Form>
          <ImageInput
            name="image"
            label="Imagen del usuario"
            fileName={userImgName}
            setFileName={setUserImgName}
            avatarImage={avatarImage}
            setAvatarImage={setAvatarImage}
          />
          <UserFormContent />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginY: 2,
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
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const UserFormContent = () => {
  // Cambiar
  const [provinces, setProvinces] = useState([""]);
  const [municipalities, setMunicipalities] = useState([""]);
  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingMunicipality, setLoadingMunicipality] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoadingProvince(true);
        const response = await getProvinces();
        const provinceData = response.data.data.map(
          (province) => province.name
        );
        setProvinces(["", ...provinceData]);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoadingProvince(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        setLoadingMunicipality(true);
        const response = await getMunicipalities();
        const municipalityData = response.data.data.map(
          (municipality) => municipality.name
        );
        setMunicipalities(["", ...municipalityData]);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      } finally {
        setLoadingMunicipality(false);
      }
    };

    fetchMunicipalities();
  }, []);
  // Cambiar

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <InputField name="firstName" label="Nombre" margin="dense" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField name="lastName" label="Apellido" margin="dense" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          name="userName"
          label="Nombre de usuario"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectInputField
          name="province"
          label="Provincia"
          margin="dense"
          disabled={loadingProvince}
          fullWidth
          options={provinces}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectInputField
          name="municipality"
          label="Municipio"
          margin="dense"
          disabled={loadingMunicipality}
          fullWidth
          options={municipalities}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField name="address" label="Dirección" margin="dense" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          name="phoneNumber"
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
  );
};

export default UserForm;
