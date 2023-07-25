import * as Yup from "yup";
import useToast from "../feedback/useToast";
import { editCompanyLoggedProfile } from "../../services/MediSearchServices/AdminServices";

const useCompanyProfileFormik = (setLoading, handleClose, setEdited) => {
  const showToast = useToast();

  const getInitialValues = (profile) => {
    return {
      logo: null,
      ceo: profile.ceo,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      province: profile.province,
      municipality: profile.municipality,
      address: profile.address,
      webSite: profile.webSite || "",
      facebook: profile.facebook || "",
      instagram: profile.instagram || "",
      twitter: profile.twitter || "",
    };
  };

  const validationSchema = Yup.object({
    ceo: Yup.string().trim().required("CEO requerido"),
    name: Yup.string().trim().required("Nombre requerido"),
    province: Yup.string().trim().required("Provincia requerida"),
    municipality: Yup.string().trim().required("Municipio requerido"),
    address: Yup.string().trim().required("Dirección requerida"),
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
    phone: Yup.string()
      .trim()
      .required("Teléfono requerido")
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        "El número de teléfono debe tener 10 dígitos"
      ),
    webSite: Yup.string().trim().url("URL del sitio web inválida").nullable(),
    facebook: Yup.string().trim().url("URL de Facebook inválida").nullable(),
    instagram: Yup.string().trim().url("URL de Instagram inválida").nullable(),
    twitter: Yup.string().trim().url("URL de Twitter inválida").nullable(),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await editCompanyLoggedProfile(values);
      showToast("Informacion de la empresa editada", { type: "success" });
      setEdited((prev) => prev + 1);
      handleClose();
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    getInitialValues,
    validationSchema,
    onSubmit,
  };
};

export default useCompanyProfileFormik;
