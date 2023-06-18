import { useEffect, useState } from "react";
import MultiStepForm, { FormStep } from "../MultiForm/MultiStepForm";
import InputField from "../InputFields/InputField";
import Grid from "@mui/material/Grid";
import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import useCompanyFormik from "../../../hooks/formiks/useCompanyFormik";
import { UserFormContent } from "./UserForm";
import ImageInput from "../InputFields/ImageInput";
import SelectInputField from "../InputFields/SelectInputField";
import {
  getMunicipalities,
  getProvinces,
} from "../../../services/TerritorialDivisionServices/TerritorialServcives";
import MaskedInputField from "../InputFields/MaskedInputField";
import { telMask } from "../../../utils/masks";

const CompanyForm = () => {
  const [loading, setLoading] = useState(false);
  const [companyImage, setCompanyImage] = useState(null);
  const [companyImgName, setCompanyImgName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [userImgName, setUserImgName] = useState("");

  const { validationUserSchema, initialUserValues } = useUserSignupFormik();
  const {
    validationCompanySchema,
    validationCompanySocialsSchema,
    initialCompanyValues,
    onSubmit,
  } = useCompanyFormik(setLoading);

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
    <MultiStepForm
      initialValues={{ ...initialUserValues, ...initialCompanyValues }}
      onSubmit={onSubmit}
      loading={loading}
    >
      <FormStep
        stepName="Información del administrador"
        validationSchema={validationUserSchema}
      >
        <ImageInput
          name="image"
          label="Imagen del usuario"
          fileName={userImgName}
          setFileName={setUserImgName}
          avatarImage={userImage}
          setAvatarImage={setUserImage}
        />
        <UserFormContent />
      </FormStep>
      <FormStep
        stepName="Información de la empresa"
        validationSchema={validationCompanySchema}
      >
        <ImageInput
          name="imageLogo"
          label="Logo de la empresa"
          fileName={companyImgName}
          setFileName={setCompanyImgName}
          avatarImage={companyImage}
          setAvatarImage={setCompanyImage}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputField
              name="ceo"
              label="Nombre del CEO"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="nameCompany"
              label="Nombre de la empresa"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInputField
              name="provinceCompany"
              label="Provincia de la empresa"
              margin="dense"
              disabled={loadingProvince}
              fullWidth
              options={provinces}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInputField
              name="municipalityCompany"
              label="Municipio de la empresa"
              margin="dense"
              disabled={loadingMunicipality}
              fullWidth
              options={municipalities}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="addressCompany"
              label="Dirección de la empresa"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="emailCompany"
              label="Correo electrónico de la empresa"
              type="email"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MaskedInputField
              mask={telMask}
              name="phoneCompany"
              label="Teléfono de la empresa"
              type="tel"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInputField
              name="companyType"
              label="Tipo de empresa"
              margin="dense"
              fullWidth
              options={["", "Farmacia", "Laboratorio"]}
            />
          </Grid>
        </Grid>
      </FormStep>
      <FormStep
        stepName="Redes de la empresa (opcional)"
        validationSchema={validationCompanySocialsSchema}
      >
        <InputField
          name="webSite"
          label="Sitio web URL"
          margin="dense"
          fullWidth
        />
        <InputField
          name="facebook"
          label="Facebook URL"
          margin="dense"
          fullWidth
        />
        <InputField
          name="instagram"
          label="Instagram URL"
          margin="dense"
          fullWidth
        />
        <InputField
          name="twitter"
          label="Twitter URL"
          margin="dense"
          fullWidth
        />
      </FormStep>
    </MultiStepForm>
  );
};

export default CompanyForm;
