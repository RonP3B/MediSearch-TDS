import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {
  addCompanyFav,
  addProductFav,
  removeCompanyFav,
  removeProductFav,
} from "../../../services/MediSearchServices/HomeServices";

const CustomCard = (props) => {
  const {
    to,
    maintenance,
    handleDelete,
    image,
    name,
    cardInfo,
    id,
    favorite,
    favoritesManager,
  } = props;

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(favorite?.isFavorite ?? false);
  }, [favorite]);

  const handleCheckboxChange = async () => {
    try {
      const isFavCompany = favorite.favoriteType === "company";
      const idProp = isFavCompany ? "companyId" : "productId";
      const addFavFunction = isFavCompany ? addCompanyFav : addProductFav;

      const removeFavFunction = isFavCompany
        ? removeCompanyFav
        : removeProductFav;

      setLoading(true);

      const res = await (isChecked
        ? removeFavFunction(id)
        : addFavFunction({ [idProp]: id }));

      if (res.data?.[idProp] && favoritesManager) {
        favoritesManager.setter((prev) =>
          prev.filter((val) => val[idProp] !== res.data?.[idProp])
        );
      }

      setIsChecked(!isChecked);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: "0 auto",
        borderRadius: "12px",
        boxShadow: 3,
      }}
    >
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {name}
        </Typography>
        {cardInfo.map((info, index) => (
          <Typography key={index} variant="body2" color="text.secondary" noWrap>
            {info.label}: {info.val}
          </Typography>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {maintenance && (
            <Box>
              <IconButton
                aria-label="Editar"
                component={Link}
                to={`edit/${id}`}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Eliminar"
                onClick={() => handleDelete(id)}
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            favorite && (
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            )
          )}
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              component={Link}
              to={to}
              variant="contained"
              startIcon={<InfoIcon />}
            >
              Detalles
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CustomCard.propTypes = {
  to: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cardInfo: PropTypes.array.isRequired,
  maintenance: PropTypes.bool.isRequired,
  favorite: PropTypes.any.isRequired,
  handleDelete: PropTypes.func,
  favoritesManager: PropTypes.object,
};

export default CustomCard;
