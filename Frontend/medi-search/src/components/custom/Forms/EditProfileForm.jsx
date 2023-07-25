import { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import useProfileFormik from "../../../hooks/formiks/useProfileFormik";
import useCompanyProfileFormik from "../../../hooks/formiks/useCompanyProfileFormik";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputField from "../InputFields/InputField";
import ImageInput from "../InputFields/ImageInput";
import useTerritorial from "../../../hooks/useTerritorial";
import SelectInputField from "../InputFields/SelectInputField";
import MaskedInputField from "../InputFields/MaskedInputField";
import { telMask } from "../../../utils/masks";
import SubmitButton from "../Buttons/SubmitButton";
import ScrollBar from "../Scrollbar/ScrollBar";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const EditProfileForm = ({
  open,
  handleClose,
  profile,
  setEdited,
  profileType,
}) => {
  const [avatarImage, setAvatarImage] = useState(
    `${ASSETS}${profile.urlImage}`
  );
  const [userImgName, setUserImgName] = useState(
    profile.urlImage.split("/").pop()
  );
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const userFormik = useProfileFormik(setLoading, handleClose, setEdited);
  const companyFormik = useCompanyProfileFormik(
    setLoading,
    handleClose,
    setEdited
  );

  const { getInitialValues, validationSchema, onSubmit } =
    profileType === "perfil" ? userFormik : companyFormik;

  const {
    provinces,
    municipalities,
    setSelectedProvince,
    municipalitiesSelect,
    provincesSelect,
    loadingProvinces,
    loadingMunicipalities,
  } = useTerritorial();

  useEffect(() => {
    provinces.length > 0 && setSelectedProvince(profile.province);
  }, [profile.province, provinces, setSelectedProvince]);

  const submitForm = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "600px",
          height: profileType === "perfil" ? "auto" : "100%",
        },
      }}
    >
      <DialogTitle>Edición de {profileType}</DialogTitle>
      <Divider />
      <ScrollBar>
        <DialogContent>
          <Formik
            initialValues={getInitialValues(profile)}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form ref={formRef}>
                <ImageInput
                  name={profileType === "perfil" ? "image" : "logo"}
                  label={
                    profileType === "perfil"
                      ? "Imagen del usuario"
                      : "Logo de la empresa"
                  }
                  fileName={userImgName}
                  setFileName={setUserImgName}
                  avatarImage={avatarImage}
                  setAvatarImage={setAvatarImage}
                  variant="standard"
                />
                {profileType === "perfil" ? (
                  <>
                    <InputField
                      autoFocus
                      name="firstName"
                      label="Nombre"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <InputField
                      name="lastName"
                      label="Apellido"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    <InputField
                      autoFocus
                      name="ceo"
                      label="Nombre del CEO"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <InputField
                      autoFocus
                      name="name"
                      label="Nombre de la empresa"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <InputField
                      name="email"
                      label="Correo electrónico de la empresa"
                      type="email"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <MaskedInputField
                      mask={telMask}
                      name="phone"
                      label="Teléfono de la empresa"
                      type="tel"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                  </>
                )}
                <SelectInputField
                  name="province"
                  label="Provincia"
                  margin="dense"
                  variant="standard"
                  fullWidth
                  options={
                    provinces.length === 0
                      ? [""]
                      : ["", ...provinces.map((province) => province.name)]
                  }
                  setSelected={setSelectedProvince}
                  disabled={provinces.length === 0}
                  loading={loadingProvinces}
                  ref={provincesSelect}
                />
                <SelectInputField
                  name="municipality"
                  label="Municipio"
                  margin="dense"
                  variant="standard"
                  fullWidth
                  options={
                    municipalities.length === 0
                      ? [""]
                      : [
                          "",
                          ...municipalities.map(
                            (municipality) => municipality.name
                          ),
                        ]
                  }
                  disabled={municipalities.length === 0}
                  loading={loadingMunicipalities}
                  ref={municipalitiesSelect}
                />
                <InputField
                  name="address"
                  label="Dirección"
                  margin="dense"
                  variant="standard"
                  fullWidth
                />
                {profileType === "empresa" && (
                  <>
                    <InputField
                      name="webSite"
                      label="Sitio web URL"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <InputField
                      name="facebook"
                      label="Facebook URL"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <InputField
                      name="instagram"
                      label="Instagram URL"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                    <InputField
                      name="twitter"
                      label="Twitter URL"
                      margin="dense"
                      variant="standard"
                      fullWidth
                    />
                  </>
                )}
              </Form>
            )}
          </Formik>
        </DialogContent>
      </ScrollBar>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <SubmitButton
          onClick={submitForm}
          text="Editar"
          loadingText="Editando..."
          loading={loading}
        />
      </DialogActions>
    </Dialog>
  );
};

EditProfileForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setEdited: PropTypes.func.isRequired,
  profileType: PropTypes.string.isRequired,
};

export default EditProfileForm;
