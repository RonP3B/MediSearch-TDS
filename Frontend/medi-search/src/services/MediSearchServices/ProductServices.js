import MediSearchApi from "../../APIs/MediSearchApi";

const ADD_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_ADD_PRODUCT;
const GET_PRODUCTS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_GET_PRODUCTS;
const GET_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_GET_PRODUCT;
const EDIT_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_EDIT_PRODUCT;
const DELETE_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_DELETE_PRODUCT;

export const createProduct = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      values[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, values[key]);
    }
  });

  return MediSearchApi.post(ADD_PRODUCT_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllProducts = () => {
  return MediSearchApi.get(GET_PRODUCTS_ENDPOINT);
};

export const getProduct = (productId) => {
  return MediSearchApi.get(`${GET_PRODUCT_ENDPOINT}/${productId}`);
};

export const editProduct = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      values[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, values[key]);
    }
  });

  return MediSearchApi.put(EDIT_PRODUCT_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (productId) => {
  return MediSearchApi.delete(`${DELETE_PRODUCT_ENDPOINT}/${productId}`);
};
