import MediSearchApi from "../../APIs/MediSearchApi";

const GET_LABORATORIES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_LABORATORIES;
const GET_PHARMACIES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_PHARMACIES;
const GET_COMPANIES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_COMPANIES;
const GET_COMPANY_ENDPOINT = import.meta.env.VITE_MEDISEARCH_COMPANY;
const GET_PRODUCT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_PRODUCT;
const GET_LAB_PRODUCTS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_LAB_PRODUCTS;
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

export const getCompanyById = (id) => {
  return MediSearchApi.get(`${GET_COMPANY_ENDPOINT}/${id}`);
};

export const getCompanyProduct = (id) => {
  return MediSearchApi.get(`${GET_PRODUCT_ENDPOINT}/${id}`);
};
