import { useState, useEffect, useRef } from "react";
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
import { getLabProducts } from "../../services/MediSearchServices/HomeServices";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import ProductCard from "../custom/Cards/ProductCard";
import useTerritorial from "../../hooks/useTerritorial";

const Provisions = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [provisions, setProvisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productNameFilter, setProductNameFilter] = useState("");
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [quantityFilter, setQuantityFilter] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const showToast = useToast();
  const showToastRef = useRef(showToast);
  const {
    provinces,
    municipalities,
    selectedProvince,
    setSelectedProvince,
    loadingMunicipalities,
  } = useTerritorial();

  useEffect(() => {
    console.count("Provisions.jsx"); //borrame
    let isMounted = true;

    const fetchProvisions = async () => {
      try {
        const res = await getLabProducts();
        const provisionsArr = res.data.$values;

        const highestPrice = provisionsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        if (isMounted) {
          setProvisions(provisionsArr);
          setPriceFilter([1, highestPrice]);
          setMaxPrice(highestPrice);
        }
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;
        showToastRef.current(
          "Ocurrió un error al obtener las provisiones, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchProvisions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const clearFilters = () => {
    console.log("a");
  };

  // add filters
  const filteredProvisions = provisions.filter(
    (provision) => provision === provision
  );

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <ProductFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        onClear={clearFilters}
        productNameFilter={productNameFilter}
        setProductNameFilter={setProductNameFilter}
        categories={["categoria a", "categoria b"]}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        quantityFilter={quantityFilter}
        maxPrice={maxPrice}
        setQuantityFilter={setQuantityFilter}
        companyFilters={true}
        provinces={provinces}
        setSelectedProvince={setSelectedProvince}
        selectedProvince={selectedProvince}
        municipalities={municipalities}
        setSelectedMunicipalities={setSelectedMunicipalities}
        selectedMunicipalities={selectedMunicipalities}
        loadingMunicipalities={loadingMunicipalities}
        companyNameFilter={companyNameFilter}
        addressFilter={addressFilter}
        setCompanyNameFilter={setCompanyNameFilter}
        setAddressFilter={setAddressFilter}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Provisiones
        </Typography>
        {!loading && provisions.length > 0 && (
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
      {!loading && provisions.length === 0 && (
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
            No hay productos de [tipo empresa] registrados en la plataforma
          </Typography>
        </Box>
      )}
      {provisions.length > 0 &&
        (filteredProvisions.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProvisions.map((provision) => (
              <Grid item key={provision.id} xs={12} sm={6} md={4}>
                <ProductCard product={provision} maintenance={false} />
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

export default Provisions;
