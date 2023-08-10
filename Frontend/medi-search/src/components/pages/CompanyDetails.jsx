import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";
import { getCompanyById } from "../../services/MediSearchServices/HomeServices";
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductCard from "../custom/Cards/ProductCard";
import CompanySocials from "../custom/Socials/CompanySocials";
import ProductFilterDrawer from "../custom/FilterDrawers/ProductFilterDrawer";
import useFilters from "../../hooks/filters/useFilters";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const CompanyInfo = ({ company }) => {
  const {
    webSite,
    facebook,
    twitter,
    instagram,
    urlImage,
    name,
    ceo,
    email,
    phone,
    province,
    address,
    municipality,
  } = company;

  const hasSocial = webSite || facebook || twitter || instagram;

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={`${ASSETS}${urlImage}`}
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              minHeight: "200px",
              minWidth: "200px",
              maxHeight: "400px",
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ overflowWrap: "anywhere" }}>
          <Divider sx={{ my: 1, display: { md: "none" } }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Nombre:"
              color="primary"
            />{" "}
            {name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="CEO:"
              color="primary"
            />{" "}
            {ceo}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Correo electrónico:"
              color="primary"
            />{" "}
            {email}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Teléfono:"
              color="primary"
            />{" "}
            {phone}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Provincia:"
              color="primary"
            />{" "}
            {province}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Municipio:"
              color="primary"
            />{" "}
            {municipality}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Dirección:"
              color="primary"
            />{" "}
            {address}
          </Typography>
          {hasSocial && <Divider sx={{ my: 1, display: { md: "none" } }} />}
        </Grid>
      </Grid>
      {hasSocial && (
        <CompanySocials
          webSite={webSite}
          facebook={facebook}
          instagram={instagram}
          twitter={twitter}
        />
      )}
    </>
  );
};

const CompanyProducts = ({
  products,
  name,
  filters,
  clearFilters,
  filteredData,
  isLogged,
  isCompany,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <ProductionQuantityLimitsIcon
          sx={{ fontSize: 200, color: "primary.main" }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {name} no tiene productos registrados
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ProductFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        onClear={clearFilters}
        filters={filters}
        companyFilters={false}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        mb={5}
      >
        <Button
          variant="contained"
          startIcon={<TuneIcon />}
          onClick={handleOpenFilter}
        >
          Filtros
        </Button>
      </Stack>
      {filteredData.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard
                favorite={
                  isLogged &&
                  !isCompany && {
                    isFavorite: product.isFavorite,
                    favoriteType: "product",
                  }
                }
                product={product}
                maintenance={false}
                showCompanyInfo={false}
                to={`${
                  isCompany ? "/company/" : isLogged ? "/client/" : "/"
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
            height: "45vh",
          }}
        >
          <FilterListOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay productos que cumplan con los filtros
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const CompanyDetails = ({ isCompany }) => {
  const [company, setCompany] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const showToastRef = useRef(showToast);
  const isLogged = !!auth?.payload;
  const isLaboratory = isLogged && auth.payload.RoleType === "Laboratorio";

  const { filters, clearFilters, filteredData, setPriceFilter, setMaxPrice } =
    useFilters(company, true);

  useEffect(() => {
    console.count("CompanyDetails.jsx"); //borrame

    const fetchCompany = async () => {
      try {
        const res = await getCompanyById(id);
        const productsArr = res.data.products.$values;

        const highestPrice = productsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        setCompany(res.data);
        setPriceFilter([1, highestPrice]);
        setMaxPrice(highestPrice);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return navigate(-1);

        showToastRef.current(
          "Ocurrió un error al obtener la información de la empresa, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [showToastRef, id, navigate, setPriceFilter, setMaxPrice]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {company.name}
        </Typography>
      </Box>
      {loading ? (
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
      ) : isLaboratory ? (
        <CompanyInfo company={company} />
      ) : (
        <CustomTabs
          tabs={[
            {
              label: "Información",
              content: <CompanyInfo company={company} />,
            },
            {
              label: "Productos",
              content: (
                <CompanyProducts
                  products={company.products.$values}
                  name={company.name}
                  filters={filters}
                  clearFilters={clearFilters}
                  filteredData={filteredData}
                  isLogged={isLogged}
                  isCompany={isCompany}
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

CompanyDetails.propTypes = {
  isCompany: PropTypes.bool.isRequired,
};

CompanyInfo.propTypes = {
  company: PropTypes.object.isRequired,
};

CompanyProducts.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  isCompany: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default CompanyDetails;
