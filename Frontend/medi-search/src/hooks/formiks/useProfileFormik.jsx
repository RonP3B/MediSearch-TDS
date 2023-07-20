import * as Yup from "yup";
import useToast from "../feedback/useToast";
import { editLoggedProfile } from "../../services/MediSearchServices/AdminServices";

const useProfileFormik = (setLoading, handleClose, setEdited) => {
  const showToast = useToast();

  const getInitialValues = (profile) => {
    return {
      image: null,
      firstName: profile.firstName,
      lastName: profile.lastName,
      province: profile.province,
      municipality: profile.municipality,
      address: profile.address,
    };
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    province: Yup.string().trim().required("Provincia requerida"),
    municipality: Yup.string().trim().required("Municipio requerido"),
    address: Yup.string().trim().required("Dirección requerida"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await editLoggedProfile(values);
      showToast("Perfil editado", { type: "success" });
      setEdited((prev) => prev + 1);
      handleClose();
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { getInitialValues, validationSchema, onSubmit };
};

export default useProfileFormik;
