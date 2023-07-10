import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ProductCard = ({ product, company, handleDelete }) => {
  const { name, price, quantity, id, urlImages } = product;
  const firstImageUrl = `${ASSETS}${urlImages.$values[0]}`;

  return (
    <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
      <CardMedia
        component="img"
        height="160"
        image={firstImageUrl}
        alt="Nombre del producto"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cantidad disponible: {quantity}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {company && (
            <Box>
              <IconButton
                aria-label="Editar"
                component={Link}
                to={`edit/${id}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Eliminar"
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              component={Link}
              to={`product-details/${id}`}
              variant="contained"
            >
              Detalles
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  company: PropTypes.bool,
};

export default ProductCard;
