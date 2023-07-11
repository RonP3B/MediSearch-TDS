import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductCard from "../custom/Cards/ProductCard";
import {
  deleteProduct,
  getAllProducts,
} from "../../services/MediSearchServices/ProductServices";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const showToastRef = useRef(showToast);
  const confirm = useConfirm();

  useEffect(() => {
    console.count("Products.jsx"); //borrame
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        isMounted && setProducts(res.data.$values);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;
        showToastRef.current(
          "Ocurrió un error al obtener los productos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [showToastRef]);

  const handleDelete = async (id) => {
    try {
      await confirm({
        title: "Confirmación",
        description: "¿Estás seguro que deseas eliminar este producto?",
        cancellationText: "Cancelar",
      });
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      showToast("Producto eliminado con éxito", { type: "success" });
    } catch (error) {
      if (error?.response)
        showToast(
          "Ocurrió un error al intentar eliminar un producto, informelo al equipo técnico",
          { type: "error" }
        );
    }
  };

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
      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {products.length === 0 && !loading ? (
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
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard
                product={product}
                company={true}
                handleDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Products;
