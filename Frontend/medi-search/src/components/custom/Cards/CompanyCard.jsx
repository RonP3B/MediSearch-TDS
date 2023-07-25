import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const CompanyCard = ({ company }) => {
  const { id, name, municipality, province, address, urlImage } = company;
  const companyImg = `${ASSETS}${urlImage}`;
  const cardInfo = [
    { label: "Provincia", val: province },
    { label: "Municipio", val: municipality },
    { label: "Dirección", val: address },
  ];

  return (
    <CustomCard
      id={id}
      name={name}
      image={companyImg}
      to={`/company/company-details/${id}`}
      maintenance={false}
      cardInfo={cardInfo}
    />
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CompanyCard;
