import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductCard from "../custom/Cards/ProductCard";
import {
  deleteProduct,
  getAllProducts,
} from "../../services/MediSearchServices/ProductServices";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const showToastRef = useRef(showToast);
  const confirm = useConfirm();

  useEffect(() => {
    console.count("Products.jsx"); //borrame

    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.$values);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;
        showToastRef.current(
          "Ocurrió un error al obtener los productos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
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
      {!loading && products.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton
            onClick={() => setShowFilter((prev) => !prev)}
            sx={{ mr: 0.75 }}
            size="medium"
          >
            <SearchIcon size="medium" />
          </IconButton>
          <TextField
            label="Filtrar por nombre"
            value={filterTerm}
            onChange={(event) => setFilterTerm(event.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              boxShadow: 2,
              transition: "width 0.3s ease-in-out",
              width: showFilter ? { xs: "210px", sm: "300px" } : "0",
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline, .css-9425fu-MuiOutlinedInput-notchedOutline":
                {
                  display: showFilter ? "block" : "none",
                },
              "label[data-shrink=false]+.MuiInputBase-formControl .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  visibility: showFilter ? "visible" : "hidden",
                },
            }}
          />
        </Box>
      )}
      {products.length === 0 && !loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "55vh",
          }}
        >
          <ProductionQuantityLimitsIcon
            sx={{ fontSize: 200, color: "primary.main" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay productos registrados
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
      )}
      {products.length > 0 &&
        (filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard
                  favorite={false}
                  product={product}
                  maintenance={true}
                  showCompanyInfo={false}
                  handleDelete={handleDelete}
                  to={`/company/my-products/product-details/${product.id}`}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "55vh",
            }}
          >
            <SearchOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No hay productos con el nombre &apos;{filterTerm}&apos;
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

export default MyProducts;
