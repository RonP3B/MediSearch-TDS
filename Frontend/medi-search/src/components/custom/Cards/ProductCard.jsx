import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ProductCard = (props) => {
  const {
    product,
    maintenance,
    showCompanyInfo,
    companyType,
    handleDelete,
    to,
    favorite,
  } = props;

  const { name, price, quantity, id, urlImages, nameCompany, province } =
    product;

  const firstImageUrl = `${ASSETS}${urlImages.$values[0]}`;

  const cardInfo = [
    { label: "Precio", val: `$${price}` },
    { label: "Cantidad disponible", val: quantity },
  ];

  if (showCompanyInfo) {
    cardInfo.push({ label: companyType, val: nameCompany });
    cardInfo.push({ label: "Provincia", val: province });
  }

  return (
    <CustomCard
      id={id}
      name={name}
      image={firstImageUrl}
      to={to}
      maintenance={maintenance}
      handleDelete={handleDelete}
      cardInfo={cardInfo}
      favorite={favorite}
    />
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  maintenance: PropTypes.bool.isRequired,
  showCompanyInfo: PropTypes.bool.isRequired,
  companyType: PropTypes.string,
  to: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default ProductCard;
