import { useState } from "react";
import MultiStepForm, { FormStep } from "../MultiForm/MultiStepForm";
import InputField from "../InputFields/InputField";
import Grid from "@mui/material/Grid";
import useUserSignupFormik from "../../../hooks/formiks/useUserSignupFormik";
import useCompanyFormik from "../../../hooks/formiks/useCompanyFormik";
import { UserFormContent } from "./UserForm";
import ImageInput from "../InputFields/ImageInput";
import SelectInputField from "../InputFields/SelectInputField";

const CompanyForm = () => {
  const [companyImage, setCompanyImage] = useState(null);
  const [companyImgName, setCompanyImgName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [userImgName, setUserImgName] = useState("");

  const { validationUserSchema, initialUserValues } = useUserSignupFormik();
  const {
    validationCompanySchema,
    validationCompanySocialsSchema,
    initialCompanyValues,
  } = useCompanyFormik();

  return (
    <MultiStepForm
      initialValues={{ ...initialUserValues, ...initialCompanyValues }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <FormStep
        stepName="Información del administrador"
        validationSchema={validationUserSchema}
      >
        <ImageInput
          name="userImg"
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
          name="companyImg"
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
            <InputField
              name="countryCompany"
              label="País de la empresa"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="cityCompany"
              label="Ciudad de la empresa"
              margin="dense"
              fullWidth
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
            <InputField
              name="phoneCompany"
              label="Teléfono de la empresa"
              type="tel"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInputField
              name="companyTypeId"
              label="Tipo de empresa"
              margin="dense"
              fullWidth
              options={[
                { value: "pharmacy", label: "Farmacia" },
                { value: "lab", label: "Laboratorio" },
              ]}
            />
          </Grid>
        </Grid>
      </FormStep>
      <FormStep
        stepName="Redes de la empresa (opcional)"
        validationSchema={validationCompanySocialsSchema}
      >
        <InputField
          name="website"
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
