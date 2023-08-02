import { useState } from "react";
import useTerritorial from "../useTerritorial";
import useClassificationCategories from "../useClassificationCategories";

const useFilters = (data, productFilters) => {
  const [productNameFilter, setProductNameFilter] = useState("");
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [quantityFilter, setQuantityFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);

  const {
    provinces,
    municipalities,
    selectedProvince,
    setSelectedProvince,
    loadingMunicipalities,
  } = useTerritorial();

  const {
    classifications,
    categories,
    selectedClassification,
    setSelectedClassification,
  } = useClassificationCategories();

  const companyProp = productFilters ? "nameCompany" : "name";
  if (!Array.isArray(data)) data = data.products.$values;

  const filters = {
    product: {
      value: productNameFilter,
      setter: setProductNameFilter,
    },
    categories: {
      values: categories,
      selectedSetter: setSelectedCategories,
      selected: selectedCategories,
    },
    price: {
      value: priceFilter,
      setter: setPriceFilter,
      maxPrice,
    },
    quantity: {
      value: quantityFilter,
      setter: setQuantityFilter,
    },
    address: {
      value: addressFilter,
      setter: setAddressFilter,
    },
    company: {
      value: companyNameFilter,
      setter: setCompanyNameFilter,
    },
    provinces: {
      values: provinces,
      selected: selectedProvince,
      selectedSetter: setSelectedProvince,
    },
    municipalities: {
      values: municipalities,
      selected: selectedMunicipalities,
      selectedSetter: setSelectedMunicipalities,
      loading: loadingMunicipalities,
    },
    classifications: {
      values: classifications,
      selected: selectedClassification,
      selectedSetter: setSelectedClassification,
    },
  };

  const clearFilters = () => {
    setProductNameFilter("");
    setSelectedCategories([]);
    setPriceFilter([1, maxPrice]);
    setQuantityFilter(0);
    setAddressFilter("");
    setCompanyNameFilter("");
    setSelectedProvince("");
    setSelectedMunicipalities([]);
    setSelectedClassification("");
  };

  const filteredData = data.filter((data) => {
    if (
      companyNameFilter &&
      data[companyProp]
        .toLowerCase()
        .indexOf(companyNameFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    if (
      addressFilter &&
      data.address.toLowerCase().indexOf(addressFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    if (selectedProvince && data.province !== selectedProvince) {
      return false;
    }

    if (
      selectedMunicipalities.length > 0 &&
      !selectedMunicipalities.includes(data.municipality)
    ) {
      return false;
    }

    if (!productFilters) {
      return true;
    }

    if (
      productNameFilter &&
      data.name.toLowerCase().indexOf(productNameFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    if (selectedCategories.length > 0) {
      const dataCategories = data.categories.$values;

      const hasMatchingCategory = selectedCategories.some((category) =>
        dataCategories.includes(category)
      );

      if (!hasMatchingCategory) return false;
    }

    const [minPrice, maxPrice] = priceFilter;

    if (data.price < minPrice || data.price > maxPrice) {
      return false;
    }

    if (quantityFilter > 0 && data.quantity < quantityFilter) {
      return false;
    }

    if (
      selectedClassification &&
      data.classification !== selectedClassification
    ) {
      return false;
    }

    return true;
  });

  return {
    filters,
    clearFilters,
    filteredData,
    setMaxPrice,
    setPriceFilter,
  };
};

export default useFilters;
