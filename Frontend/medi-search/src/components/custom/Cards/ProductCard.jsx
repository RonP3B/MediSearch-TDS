import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ProductCard = ({ product, maintenance, handleDelete }) => {
  const { name, price, quantity, id, urlImages, nameCompany } = product;
  const firstImageUrl = `${ASSETS}${urlImages.$values[0]}`;

  const cardInfo = [
    { label: "Precio", val: `$${price}` },
    { label: "Cantidad", val: quantity },
  ];

  if (!maintenance) cardInfo.push({ label: "Laboratorio", val: nameCompany });

  return (
    <CustomCard
      id={id}
      name={name}
      image={firstImageUrl}
      to={`/company/products/product-details/${id}`}
      maintenance={maintenance}
      handleDelete={handleDelete}
      cardInfo={cardInfo}
    />
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  maintenance: PropTypes.bool.isRequired,
};

export default ProductCard;
