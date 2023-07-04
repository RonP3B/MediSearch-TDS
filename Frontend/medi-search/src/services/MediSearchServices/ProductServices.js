import MediSearchApi from "../../APIs/MediSearchApi";

const ADD_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_ADD_PRODUCT;

export const createProduct = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    console.log(values[key]);
    formData.append(key, values[key]);
  });

  return MediSearchApi.post(ADD_PRODUCT_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
