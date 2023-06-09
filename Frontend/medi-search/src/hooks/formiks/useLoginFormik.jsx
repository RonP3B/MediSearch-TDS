import * as Yup from "yup";

const useLoginFormik = () => {
  const initialValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().trim().required("Nombre de usuario requerido"),
    password: Yup.string().trim().required("Contraseña requerida"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    alert("me mandaron");
  };

  return { initialValues, validationSchema, onSubmit };
};

export default useLoginFormik;
