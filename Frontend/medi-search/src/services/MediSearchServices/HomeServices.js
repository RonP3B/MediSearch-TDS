import MediSearchApi from "../../APIs/MediSearchApi";

const GET_LABORATORIES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_LABORATORIES;
const GET_PHARMACIES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_PHARMACIES;
const GET_COMPANIES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_COMPANIES;
const GET_COMPANY_ENDPOINT = import.meta.env.VITE_MEDISEARCH_COMPANY;
const GET_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_PRODUCT;
const GET_LAB_PRODUCTS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_LAB_PRODUCTS;
const GET_FAV_PRODUCTS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_FAV_PRODUCTS;
const POST_FAV_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_FAV_PRODUCT;
const POST_FAV_COMPANY_ENDPOINT = import.meta.env.VITE_MEDISEARCH_FAV_COMPANY;
const UNFAV_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_UNFAV_PRODUCT;
const UNFAV_COMPANY_ENDPOINT = import.meta.env.VITE_MEDISEARCH_UNFAV_COMPANY;

const GET_FAV_COMPANIES_ENDPOINT = import.meta.env
  .VITE_MEDISEARCH_FAV_COMPANIES;

const GET_PHARMACY_PRODUCTS_ENDPOINT = import.meta.env
  .VITE_MEDISEARCH_PHARMACY_PRODUCTS;

export const getAllLabs = () => {
  return MediSearchApi.get(GET_LABORATORIES_ENDPOINT);
};

export const getAllPharmacies = () => {
  return MediSearchApi.get(GET_PHARMACIES_ENDPOINT);
};

export const getAllCompanies = () => {
  return MediSearchApi.get(GET_COMPANIES_ENDPOINT);
};

export const getLabProducts = () => {
  return MediSearchApi.get(GET_LAB_PRODUCTS_ENDPOINT);
};

export const getPharmacyProducts = () => {
  return MediSearchApi.get(GET_PHARMACY_PRODUCTS_ENDPOINT);
};

export const getFavoriteProducts = () => {
  return MediSearchApi.get(GET_FAV_PRODUCTS_ENDPOINT);
};

export const getFavoriteCompanies = () => {
  return MediSearchApi.get(GET_FAV_COMPANIES_ENDPOINT);
};

export const getCompanyById = (id) => {
  return MediSearchApi.get(`${GET_COMPANY_ENDPOINT}/${id}`);
};

export const getCompanyProduct = (id) => {
  return MediSearchApi.get(`${GET_PRODUCT_ENDPOINT}/${id}`);
};

export const addProductFav = (values) => {
  return MediSearchApi.post(POST_FAV_PRODUCT_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const addCompanyFav = (values) => {
  return MediSearchApi.post(POST_FAV_COMPANY_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const removeProductFav = (id) => {
  return MediSearchApi.delete(`${UNFAV_PRODUCT_ENDPOINT}/${id}`);
};

export const removeCompanyFav = (id) => {
  return MediSearchApi.delete(`${UNFAV_COMPANY_ENDPOINT}/${id}`);
};
