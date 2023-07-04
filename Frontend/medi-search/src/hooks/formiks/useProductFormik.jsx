import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useToast from "../useToast";
import { createProduct } from "../../services/MediSearchServices/ProductServices";

const useProductFormik = (setLoading) => {
  const navigate = useNavigate();
  const showToast = useToast();

  const initialValues = {
    name: "",
    description: "",
    categories: [],
    components: [],
    price: 0,
    quantity: 0,
    images: [],
    companyId: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Nombre requerido"),
    description: Yup.string().trim().required("Descripción requerida"),
    categories: Yup.array().min(1, "Categoría requerida"),
    components: Yup.array().min(1, "Componente requerido"),
    price: Yup.number("Solo se pueden ingresar números")
      .min(1, "El precio debe ser mayor o igual a 1")
      .required("El precio es requerido"),
    quantity: Yup.number("Solo se pueden ingresar números")
      .min(1, "La cantidad debe ser mayor o igual a 1")
      .required("La cantidad es requerida"),
    images: Yup.array().min(1, "Seleccione al menos una imagen"),
  });

  const onSubmit = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      await createProduct(values);
      navigate("/company/products");
      showToast("Producto creado con éxito", { type: "success" });
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { validationSchema, initialValues, onSubmit };
};

export default useProductFormik;
