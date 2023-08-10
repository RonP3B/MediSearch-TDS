import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLoggedProfile } from "../../services/MediSearchServices/AdminServices";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Logo from "../../assets/images/Logo.png";
import CardsCarousel from "../custom/Carousel/CardsCarousel";
import ProductCard from "../custom/Cards/ProductCard";
import CompanyCard from "../custom/Cards/CompanyCard";
import useAuth from "../../hooks/persistence/useAuth";
import {
  getAllPharmacies,
  getFavoriteCompanies,
  getFavoriteProducts,
  getPharmacyProducts,
} from "../../services/MediSearchServices/HomeServices";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ClientHome = () => {
  const { auth } = useAuth();
  const [pharmProducts, setPharmProducts] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [favPharmacies, setFavPharmacies] = useState([]);
  const [favProducts, setFavProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmProductsRes = await getPharmacyProducts();
        const pharmProductsData = pharmProductsRes.data.$values.slice(0, 10);
        setPharmProducts(pharmProductsData);
      } catch (error) {
        setPharmProducts(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedUser = await getLoggedProfile();
        const pharmaciesRes = await getAllPharmacies();

        const filteredCompanies = pharmaciesRes.data.$values.filter(
          (company) => company.province === loggedUser.data.province
        );

        const pharmaciesData =
          filteredCompanies.length === 0
            ? null
            : filteredCompanies.slice(0, 10);

        setPharmacies(pharmaciesData);
      } catch (error) {
        setPharmacies(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getFavoriteProducts();
        const favProductsData = res.data.$values.slice(0, 10);
        setFavProducts(favProductsData.length > 0 ? favProductsData : null);
      } catch (error) {
        setFavProducts(null);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const res = await getFavoriteCompanies();
        const favPharmaciesData = res.data.$values.slice(0, 10);
        setFavPharmacies(
          favPharmaciesData.length > 0 ? favPharmaciesData : null
        );
      } catch (error) {
        setFavPharmacies(null);
      }
    };

    fetchPharmacies();
  }, []);

  const LoadingSkeleton = () => {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  };

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        sx={{
          height: { xs: "max-content", md: 420 },
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
          mt: 0.5,
        }}
      >
        <Grid item xs={12} sm={8} md={6} p={2} sx={{ maxHeight: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: 200, sm: 175, md: 190 },
                width: { xs: 200, sm: 175, md: 190 },
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "primary.main",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              alt={auth.payload.sub}
              src={`${ASSETS}${auth.payload.UrlImage}`}
            />
            <Box
              sx={{
                border: "2px solid",
                borderColor: (theme) => theme.palette.primary.light,
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.light, 0.3),
                padding: 2,
                borderRadius: 3,
                width: { xs: "100%", sm: "59%" },
                margin: { xs: ".5rem 0 0 0", sm: "0 0 0 .5rem" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "0.1rem",
                }}
                noWrap
              >
                {auth.payload.sub}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {auth.payload.email}
              </Typography>
              <Button
                component={Link}
                to="/client/my-profile"
                variant="outlined"
              >
                ver mi perfil
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={6} sx={{ maxHeight: "100%" }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo de la página"
            sx={{
              maxHeight: 420,
              height: { xs: 200, sm: "auto" },
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Bienvenido a MediSearch
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            ¡Hola {auth.payload.sub}! Te damos la bienvenida a MediSearch, tu
            plataforma de acceso rápido y seguro a medicamentos y productos
            farmacéuticos. Explora, conecta con farmacias, y lleva tu salud al
            siguiente nivel.
          </Typography>
        </Box>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Últimos productos farmacéuticos agregados
          </Typography>
          {pharmProducts.length === 0 ? (
            <LoadingSkeleton />
          ) : pharmProducts ? (
            <CardsCarousel>
              {pharmProducts.map((product) => (
                <ProductCard
                  favorite={false}
                  key={product.id}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={true}
                  companyType={"Farmacia"}
                  to={`/client/products/product-details/${product.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay productos registrados
            </Typography>
          )}
        </Box>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Tus últimos productos favoritos
          </Typography>
          {favProducts?.length === 0 ? (
            <LoadingSkeleton />
          ) : favProducts ? (
            <CardsCarousel>
              {favProducts.map((product) => (
                <ProductCard
                  favorite={false}
                  key={product.id}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={true}
                  companyType={"Farmacia"}
                  to={`/client/products/product-details/${product.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No has agregado productos a tus favoritos
            </Typography>
          )}
        </Box>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Tus últimas farmacias favoritas
          </Typography>
          {favPharmacies?.length === 0 ? (
            <LoadingSkeleton />
          ) : favPharmacies ? (
            <CardsCarousel>
              {favPharmacies.map((pharmacy) => (
                <CompanyCard
                  favorite={false}
                  key={pharmacy.id}
                  company={pharmacy}
                  to={`/client/companies/company-details/${pharmacy.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No has agregado farmacias a tus favoritos
            </Typography>
          )}
        </Box>
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Farmacias en tu provincia
          </Typography>
          {pharmacies?.length === 0 ? (
            <LoadingSkeleton />
          ) : pharmacies ? (
            <CardsCarousel>
              {pharmacies.map((pharmacy) => (
                <CompanyCard
                  favorite={false}
                  key={pharmacy.id}
                  company={pharmacy}
                  to={`/client/companies/company-details/${pharmacy.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay farmacias de tu provincia
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ClientHome;
