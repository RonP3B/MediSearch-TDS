import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const CompanyCard = ({ company, to, favorite }) => {
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
      to={to}
      maintenance={false}
      cardInfo={cardInfo}
      favorite={favorite}
    />
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default CompanyCard;
