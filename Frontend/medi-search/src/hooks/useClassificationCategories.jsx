import { useState, useEffect, useRef } from "react";
import { classificationCategories } from "../utils/classificationCategories";

const useClassificationCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState("");
  const [resetCategories, setResetCategories] = useState(false);
  const categoriesSelect = useRef();
  const classificationsSelect = useRef();

  useEffect(() => {
    resetCategories && categoriesSelect.current?.setValue([]);

    if (selectedClassification) {
      setCategories(
        classificationCategories.find(
          (item) => item.classification === selectedClassification
        ).categories
      );

      !resetCategories && setResetCategories(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClassification]);

  const classifications = classificationCategories.map(
    (item) => item.classification
  );

  return {
    classifications,
    categories,
    setSelectedClassification,
    categoriesSelect,
    classificationsSelect,
    selectedClassification,
  };
};

export default useClassificationCategories;
