import { useState, useEffect, useRef } from "react";
import {
  getProvinceMunicipalities,
  getProvinces,
} from "../services/TerritorialDivisionServices/TerritorialServcives";

const useTerritorial = () => {
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [resetMunicipality, setResetMunicipality] = useState(true);
  const municipalitiesSelect = useRef();
  const provincesSelect = useRef();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvinces();
        setProvinces(response.data.data);

        const provinceValue = provincesSelect.current?.getValue();

        if (provinceValue) {
          setSelectedProvince(provinceValue);
          setResetMunicipality(false);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (!selectedProvince) return setMunicipalities([]);

      try {
        const provinceCode = provinces.filter(
          (province) => province.name === selectedProvince
        )[0]?.code;

        const response = await getProvinceMunicipalities(provinceCode);
        let responseData = [];

        if (Array.isArray(response.data.data)) {
          responseData = response.data.data;
        } else if (typeof response.data.data === "object") {
          responseData = [response.data.data];
        }

        setMunicipalities(responseData);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };

    if (selectedProvince !== "" && resetMunicipality) {
      municipalitiesSelect.current?.setValue("");
    }

    provinces.length > 0 && fetchMunicipalities();

    return () => setResetMunicipality(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  return {
    provinces,
    municipalities,
    selectedProvince,
    setSelectedProvince,
    municipalitiesSelect,
    provincesSelect,
    setProvinces,
  };
};

export default useTerritorial;
