import axios from "axios";

const MediSearchApi = axios.create({
  baseURL: import.meta.env.VITE_MEDISEARCH_API,
  withCredentials: true,
  credentials: "include",
  mode: "cors",
});

export default MediSearchApi;
