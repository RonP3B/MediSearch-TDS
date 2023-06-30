import MediSearchApi from "../../APIs/MediSearchApi";

const EMPLOYEES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_EMPLOYEES;
const ADD_EMPLOYEES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_ADD_EMPLOYEE;
const DELETE_EMPLOYEES_ENDPOINT = import.meta.env.VITE_MEDISEARCH_DELETE_EMPLOYEE;

export const getAllEmployees = () => {
  return MediSearchApi.get(EMPLOYEES_ENDPOINT);
};

export const registerEmployee = (values) => {
  return MediSearchApi.post(ADD_EMPLOYEES_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteEmployee = (employeeID) => {
  return MediSearchApi.delete(DELETE_EMPLOYEES_ENDPOINT + `/${id}`);
}
