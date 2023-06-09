import * as Yup from "yup";

const useCompanyFormik = () => {
  const initialCompanyValues = {
    ceo: "",
    nameCompany: "",
    companyImg: "",
    countryCompany: "",
    cityCompany: "",
    addressCompany: "",
    emailCompany: "",
    phoneCompany: "",
    companyTypeId: "",
    webSite: "",
    facebook: "",
    instagram: "",
    twitter: "",
  };

  const validationCompanySchema = Yup.object({
    ceo: Yup.string().trim().required("CEO requerido"),
    nameCompany: Yup.string().trim().required("Nombre requerido"),
    companyImg: Yup.mixed().required("Logo requerido"),
    countryCompany: Yup.string().trim().required("País requerido"),
    cityCompany: Yup.string().trim().required("Ciudad requerida"),
    addressCompany: Yup.string().trim().required("Dirección requerida"),
    emailCompany: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
    phoneCompany: Yup.string()
      .trim()
      .required("Teléfono requerido")
      .matches(/^\d{10}$/, "El número de teléfono debe tener 10 dígitos"),
    companyTypeId: Yup.string().required("Tipo de empresa requerido"),
  });

  const validationCompanySocialsSchema = Yup.object({
    webSite: Yup.string().trim().url("URL del sitio web inválida").nullable(),
    facebook: Yup.string().trim().url("URL de Facebook inválida").nullable(),
    instagram: Yup.string().trim().url("URL de Instagram inválida").nullable(),
    twitter: Yup.string().trim().url("URL de Twitter inválida").nullable(),
  });

  return {
    initialCompanyValues,
    validationCompanySchema,
    validationCompanySocialsSchema,
  };
};

export default useCompanyFormik;
