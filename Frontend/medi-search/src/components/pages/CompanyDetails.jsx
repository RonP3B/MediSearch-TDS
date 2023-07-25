import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import { getCompanyById } from "../../services/MediSearchServices/HomeServices";
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductCard from "../custom/Cards/ProductCard";
import CompanySocials from "../custom/Socials/CompanySocials";

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

const CompanyProducts = ({ products, name }) => {
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
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} maintenance={false} />
        </Grid>
      ))}
    </Grid>
  );
};

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    console.count("CompanyDetails.jsx"); //borrame
    let isMounted = true;

    const fetchCompany = async () => {
      try {
        const res = await getCompanyById(id);
        isMounted && setCompany(res.data);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return navigate(-1);

        showToastRef.current(
          "Ocurrió un error al obtener la información de la empresa, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchCompany();

    return () => {
      isMounted = false;
    };
  }, [showToastRef, id, navigate]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
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
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

CompanyInfo.propTypes = {
  company: PropTypes.object.isRequired,
};

CompanyProducts.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default CompanyDetails;
