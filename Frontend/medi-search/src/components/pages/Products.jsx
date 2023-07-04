import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

//ProductoCard component
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
//ProductoCard component

const Products = () => {
  const [products, setProducts] = useState([]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Productos
        </Typography>
        <Button
          component={Link}
          to="add"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nuevo producto
        </Button>
      </Stack>
      {products.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProductionQuantityLimitsIcon
            sx={{ fontSize: 200, color: "primary.main" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay productos
          </Typography>
          <Button
            component={Link}
            to="add"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Nuevo producto
          </Button>
        </Box>
      ) : (
        // map de ProductCard component
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="data:image/jpeg;base64,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"
            alt="Nombre del producto"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Pastilla
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precio: $100
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cantidad: 10
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <IconButton aria-label="Editar">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Eliminar">
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Button variant="contained">Detalles</Button>
            </Box>
          </CardContent>
        </Card>
        // map de ProductCard component
      )}
    </Container>
  );
};

export default Products;
