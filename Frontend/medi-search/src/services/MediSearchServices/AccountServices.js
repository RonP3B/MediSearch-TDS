import MediSearchApi from "../../APIs/MediSearchApi";

const LOGIN_ENDPOINT = import.meta.env.VITE_MEDISEARCH_LOGIN;
const SIGN_USER_ENDPOINT = import.meta.env.VITE_MEDISEARCH_SIGN_USER;
const SIGN_COMPANY_ENDPOINT = import.meta.env.VITE_MEDISEARCH_SIGN_COMPANY;
const RESET_PASS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_RESET_PASS;
const CONFIRM_CODE_ENDPOINT = import.meta.env.VITE_MEDISEARCH_CONFIRM_CODE;
const CHANGE_PASS_ENDPOINT = import.meta.env.VITE_MEDISEARCH_CHANGE_PASS;
const LOGOUT_ENDPOINT = import.meta.env.VITE_MEDISEARCH_LOGOUT;

export const login = (values) => {
  return MediSearchApi.post(LOGIN_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const registerUser = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  return MediSearchApi.post(SIGN_USER_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const registerCompany = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  return MediSearchApi.post(SIGN_COMPANY_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const findUserReset = (values) => {
  return MediSearchApi.post(RESET_PASS_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const confirmCode = (values) => {
  return MediSearchApi.post(CONFIRM_CODE_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const changePassword = (values) => {
  return MediSearchApi.post(CHANGE_PASS_ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const logout = () => {
  return MediSearchApi.get(LOGOUT_ENDPOINT);
};
