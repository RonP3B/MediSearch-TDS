import { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import useProfileFormik from "../../../hooks/formiks/useProfileFormik";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputField from "../InputFields/InputField";
import ImageInput from "../InputFields/ImageInput";
import useTerritorial from "../../../hooks/useTerritorial";
import SelectInputField from "../InputFields/SelectInputField";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const EditProfileForm = ({ open, handleClose, profile, setEdited }) => {
  const [avatarImage, setAvatarImage] = useState(
    `${ASSETS}${profile.urlImage}`
  );
  const [userImgName, setUserImgName] = useState(
    profile.urlImage.split("/").pop()
  );
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const { getInitialValues, validationSchema, onSubmit } = useProfileFormik(
    setLoading,
    handleClose,
    setEdited
  );

  const {
    provinces,
    municipalities,
    setSelectedProvince,
    municipalitiesSelect,
    provincesSelect,
  } = useTerritorial();

  useEffect(() => {
    setSelectedProvince(profile.province);
  }, [profile.province, setSelectedProvince]);

  const submitForm = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "600px" } }}
    >
      <DialogTitle>Edición de perfil</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={getInitialValues(profile)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form ref={formRef}>
              <ImageInput
                name="image"
                label="Imagen del usuario"
                fileName={userImgName}
                setFileName={setUserImgName}
                avatarImage={avatarImage}
                setAvatarImage={setAvatarImage}
                variant="standard"
              />
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
                ref={municipalitiesSelect}
              />
              <InputField
                name="address"
                label="Dirección"
                margin="dense"
                variant="standard"
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={submitForm} disabled={loading}>
          {loading ? "Editando" : "Editar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProfileForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setEdited: PropTypes.func.isRequired,
};

export default EditProfileForm;
