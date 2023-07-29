import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useToast from "../feedback/useToast";
import {
  createProduct,
  editProduct,
} from "../../services/MediSearchServices/ProductServices";

const useProductFormik = (setLoading, edit) => {
  const navigate = useNavigate();
  const showToast = useToast();

  const getInitialValues = () => {
    return {
      name: "",
      description: "",
      classification: "",
      categories: [],
      price: "",
      quantity: "",
      images: [],
    };
  };

  const getEditInitialValues = (product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      classification: product.classification,
      categories: product.categories.$values,
      price: product.price,
      quantity: product.quantity,
      images: [],
    };
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Nombre requerido"),
    description: Yup.string().trim().required("Descripción requerida"),
    classification: Yup.string().trim().required("Clasificación requerida"),
    categories: Yup.array().min(1, "Categoría requerida"),
    price: Yup.number("Solo se pueden ingresar números")
      .min(1, "El precio debe ser mayor o igual a 1")
      .required("El precio es requerido"),
    quantity: Yup.number("Solo se pueden ingresar números")
      .min(1, "La cantidad debe ser mayor o igual a 1")
      .required("La cantidad es requerida"),
    images: edit
      ? Yup.array()
      : Yup.array().min(1, "Seleccione al menos una imagen"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      edit ? await editProduct(values) : await createProduct(values);
      navigate("/company/products");
      showToast(`Producto ${edit ? "editado" : "creado"} con éxito`, {
        type: "success",
      });
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { validationSchema, getInitialValues, getEditInitialValues, onSubmit };
};

export default useProductFormik;
