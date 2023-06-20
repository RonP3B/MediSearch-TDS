import axios from "axios";

const TerritorialDivisionApi = axios.create({
  baseURL: "https://api.digital.gob.do/v1/territories",
});

export default TerritorialDivisionApi;
