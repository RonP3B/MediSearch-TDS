import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CustomCard = (props) => {
  const { to, maintenance, handleDelete, image, name, cardInfo, id } = props;

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
          <Typography key={index} variant="body2" color="text.secondary">
            {info.label}: {info.val}
          </Typography>
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
  handleDelete: PropTypes.func,
};

export default CustomCard;
