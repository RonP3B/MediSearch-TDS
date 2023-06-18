import { useState, useEffect } from "react";
import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import InputField from "../InputFields/InputField";
import SubmitButton from "../Buttons/SubmitButton";
import ImageInput from "../InputFields/ImageInput";
import PasswordInputField from "../InputFields/PasswordInputField";
import SelectInputField from "../InputFields/SelectInputField";
import { telMask } from "../../../utils/masks";
import MaskedInputField from "../InputFields/MaskedInputField";
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
          <SubmitButton
            loading={loading}
            text="Registrar"
            loadingText="Registrando..."
            variant="contained"
            fullWidth
          />
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
        <MaskedInputField
          mask={telMask}
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
