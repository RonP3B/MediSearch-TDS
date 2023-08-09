import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import ProductFilterDrawer from "../custom/FilterDrawers/ProductFilterDrawer";
import {
  getLabProducts,
  getPharmacyProducts,
} from "../../services/MediSearchServices/HomeServices";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import ProductCard from "../custom/Cards/ProductCard";
import useFilters from "../../hooks/filters/useFilters";

const Products = ({ isCompany, logged, companyType, hideTitle }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    filters,
    clearFilters,
    filteredData: filteredProducts,
    setPriceFilter,
    setMaxPrice,
  } = useFilters(products, true);

  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    console.count("products.jsx"); //borrame

    const fetchProducts = async () => {
      try {
        const res = await (companyType === "Laboratorio"
          ? getLabProducts()
          : getPharmacyProducts());

        const productsArr = res.data.$values;

        const highestPrice = productsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        setProducts(productsArr);
        setPriceFilter([1, highestPrice]);
        setMaxPrice(highestPrice);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;

        if (error.response.status === 404) return;

        showToastRef.current(
          "Ocurrió un error al obtener las productos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setMaxPrice, setPriceFilter]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      <ProductFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        onClear={clearFilters}
        filters={filters}
        companyFilters={true}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={!hideTitle && logged ? "space-between" : "flex-end"}
        mb={5}
      >
        {!hideTitle && logged && (
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {isCompany
              ? "Provisiones"
              : logged
              ? "Productos farmacéuticos"
              : "Productos"}
          </Typography>
        )}
        {!loading && products.length > 0 && (
          <Button
            variant="contained"
            startIcon={<TuneIcon />}
            onClick={handleOpenFilter}
          >
            Filtros
          </Button>
        )}
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
      {!loading && products.length === 0 && (
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
            No hay productos de laboratorios registrados en la plataforma
          </Typography>
        </Box>
      )}
      {products.length > 0 &&
        (filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard
                  favorite={logged && !isCompany}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={true}
                  companyType={companyType}
                  to={`${
                    isCompany ? "/company/" : logged ? "/client/" : "/"
                  }products/product-details/${product.id}`}
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
            <FilterListOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No hay productos que cumplan con los filtros
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

Products.propTypes = {
  logged: PropTypes.bool.isRequired,
  isCompany: PropTypes.bool.isRequired,
  companyType: PropTypes.string.isRequired,
  hideTitle: PropTypes.bool,
};

export default Products;
