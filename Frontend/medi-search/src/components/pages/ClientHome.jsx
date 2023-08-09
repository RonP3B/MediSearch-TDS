import { useState, useEffect } from "react";
import { getLoggedProfile } from "../../services/MediSearchServices/AdminServices";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Logo from "../../assets/images/Logo.png";
import CardsCarousel from "../custom/Carousel/CardsCarousel";
import ProductCard from "../custom/Cards/ProductCard";
import CompanyCard from "../custom/Cards/CompanyCard";
import useAuth from "../../hooks/persistence/useAuth";
import {
  getAllPharmacies,
  getPharmacyProducts,
} from "../../services/MediSearchServices/HomeServices";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ClientHome = () => {
  const { auth } = useAuth();
  const [pharmProducts, setPharmProducts] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [favPharmacies, setFavPharmacies] = useState(null);
  const [favProducts, setFavProducts] = useState(null);

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

  const LoadingSkeleton = () => {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          height: { xs: "max-content", md: 420 },
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
          mt: 0.5,
        }}
      >
        <Grid item xs={12} md={6} p={2} sx={{ maxHeight: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: 120, sm: 220 },
                width: { xs: 150, sm: 250 },
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "primary.main",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                mr: 2,
              }}
              alt="Avatar"
              src={`${ASSETS}${auth.payload.UrlImage}`}
            />
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.primary.light,
                padding: 2,
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: -12,
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: "12px solid",
                  borderTopColor: (theme) => theme.palette.primary.light,
                  transform: "rotate(-17deg)",
                }}
              ></Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "0.1rem",
                }}
              >
                {auth.payload.sub}
              </Typography>
              <Typography variant="subtitle2">{auth.payload.email}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ maxHeight: "100%" }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo de la página"
            sx={{
              maxHeight: 420,
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
                  favorite={true}
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
            Farmacias en tu provincia
          </Typography>
          {pharmacies?.length === 0 ? (
            <LoadingSkeleton />
          ) : pharmacies ? (
            <CardsCarousel>
              {pharmacies.map((pharmacy) => (
                <CompanyCard
                  favorite={true}
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
      </Container>
    </Box>
  );
};

export default ClientHome;
