import MediSearchApi from "../../APIs/MediSearchApi";

const EMPLOYEES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_EMPLOYEES;
const PROFILE_ENDPOINT = import.meta.env.VITE_MEDISEARCH_PROFILE;
const EDIT_PROFILE_ENDPOINT = import.meta.env.VITE_MEDISEARCH_EDIT_PROFILE;
const ADD_EMPLOYEES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_ADD_EMPLOYEE;

const COMPANY_PROFILE_ENDPOINT = import.meta.env
  .VITE_MEDISEARCH_COMPANY_PROFILE;

const EDIT_COMPANY_PROFILE_ENDPOINT = import.meta.env
  .VITE_MEDISEARCH_EDIT_COMPANY_PROFILE;

const DELETE_EMPLOYEES_ENDPOINT = import.meta.env
  .VITE_MEDISEARCH_DELETE_EMPLOYEE;

export const getAllEmployees = () => {
  return MediSearchApi.get(EMPLOYEES_ENDPOINT);
};

export const getLoggedProfile = () => {
  return MediSearchApi.get(PROFILE_ENDPOINT);
};

export const getLoggedCompanyProfile = () => {
  return MediSearchApi.get(COMPANY_PROFILE_ENDPOINT);
};

export const registerEmployee = (values) => {
  return MediSearchApi.post(ADD_EMPLOYEES_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const editLoggedProfile = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => formData.append(key, values[key]));

  return MediSearchApi.put(EDIT_PROFILE_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const editCompanyLoggedProfile = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => formData.append(key, values[key]));

  return MediSearchApi.put(EDIT_COMPANY_PROFILE_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEmployee = (employeeID) => {
  return MediSearchApi.delete(DELETE_EMPLOYEES_ENDPOINT + `/${employeeID}`);
};
