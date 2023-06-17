import axios from "axios";

export const getProvinces = () => {
  return axios.get("https://api.digital.gob.do/v1/territories/provinces");
};

export const getMunicipalities = () => {
  return axios.get("https://api.digital.gob.do/v1/territories/municipalities");
};
