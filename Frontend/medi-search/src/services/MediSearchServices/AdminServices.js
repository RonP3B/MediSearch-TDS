import MediSearchApi from "../../APIs/MediSearchApi";

const EMPLOYEES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_EMPLOYEES;

export const getAllEmployees = () => {
  return MediSearchApi.get(EMPLOYEES_ENDPOINT);
};
